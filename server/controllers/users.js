import bcrypt from 'bcrypt';
import user from '../models';

export default class UserHelpers {
  /**
  * Updates upvotes array in voteObj
  * @param {object} req for first parameter
  * @param {object} res for second parameter
  */
  createUser(req, res) {
    const User = user.User;
    const password = req.body.password;
    const username = req.body.username;
    const email = req.body.email;
    const password2 = req.body.password2;

    if (!username || !password || !password2 || !email) {
      res.status(201).send("Please, fill in the fields");
    }

    if (password !== password2) {
      res.status(201).send("Please, enter the same password twice.");
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    return User
      .create({
        username: username,
        email: email,
        password: hashedPassword,
      })
      .then(user => res.status(201).send(user))
      .catch(error => res.status(400).send(error));
  }
}