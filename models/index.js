const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack');

const Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM('open', 'closed'),
  }
})

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    isEmail: true
  }
})

Page.belongsTo(User, { as: 'author' });

const slugGen = function (title) {
  if (title) {
    return title.replace(/\s+/g, '_').replace(/\W/g, '');
  } else {
    let result = '';
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 8; i++){
      result += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    return result;
  }
}

Page.beforeValidate((page, options) => {
  let slugTitle = slugGen(page.title);
  page.slug = slugTitle;
  if (!page.title) {
    page.title = slugTitle
  }
})

module.exports = {
  db, Page, User
};
