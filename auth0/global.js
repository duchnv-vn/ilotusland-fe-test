var configuration = process.env;

class WrongUsernameOrPasswordError extends Error {
  constructor(arg) {
    super(`Wrong username or password: ${arg}`);
  }
}

Object.assign(global, {
  configuration,
  WrongUsernameOrPasswordError,
});
