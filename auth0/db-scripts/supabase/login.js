require('../../global');

// ----- PRODUCTION CODE IN BELOW

async function login(email, password, callback) {
  const bcrypt = require('bcrypt');
  const { Client } = require('pg');
  const client = new Client({
    connectionString: configuration.DB_SESSION_MODE_URL || '',
  });

  try {
    if (!email || !password) {
      return callback(new Error('MISSING_EMAIL_OR_PASSWORD'));
    }
    await client.connect();

    const result = await client.query(
      `SELECT * FROM "public"."users" WHERE email = '${email}'`,
    );

    if (!result || !result.rows.length) {
      return callback(new WrongUsernameOrPasswordError(email));
    }

    const user = result.rows[0];

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return callback(new WrongUsernameOrPasswordError(email));
    }

    delete user.password;

    return callback(null, {
      user_id: user.id,
      ...user,
    });
  } catch (error) {
    return callback(error);
  } finally {
    await client.end();
  }
}

// ----- PRODUCTION CODE IN ABOVE

login(
  configuration.TEST_USER_EMAIL,
  configuration.TEST_USER_PASSWORD,
  (error, user) => {
    console.log('error', error);
    console.log('user', user);
  },
);
