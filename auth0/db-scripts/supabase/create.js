require('../../global');

// ----- PRODUCTION CODE IN BELOW

async function create(user, callback) {
  const bcrypt = require('bcrypt');
  const { Client } = require('pg');
  const client = new Client({
    connectionString: configuration.DB_SESSION_MODE_URL || '',
  });

  try {
    if (!user.email || !user.password) {
      return callback(new Error('MISSING_EMAIL_OR_PASSWORD'));
    }
    await client.connect();

    const checkEmailExistResult = await client.query(
      `SELECT * FROM "public"."users" WHERE email = '${user.email}'`,
    );

    if (!!checkEmailExistResult && !!checkEmailExistResult.rows.length) {
      return callback(new Error('EMAIL_EXISTED'));
    }

    const hashedPassword = await bcrypt.hash(
      user.password,
      Number(configuration.BCRYPT_SALT) || 10,
    );

    await client.query(`
      INSERT INTO "public"."users"(email, password)
      VALUES ('${user.email}', '${hashedPassword}')
      `);

    return callback(null, true);
  } catch (error) {
    return callback(error);
  } finally {
    await client.end();
  }
}

// ----- PRODUCTION CODE IN ABOVE

create(
  {
    email: `test_user_${Date.now()}@gmail.com`,
    password: configuration.TEST_USER_PASSWORD,
  },
  (error, user) => {
    console.log('error', error);
    console.log('user', user);
  },
);
