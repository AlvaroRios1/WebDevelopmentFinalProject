const { User, Wallet, Adress, Comment } = require('../models');
const  stripe  = require('../app.js');
// const session = stripe.checkout.sessions.create({
//     payment_method_types: ['card'],
//     line_items: [{
//       name: 'Crypto',
//       description: 'Some Crypto',
//       images: ['https://cdn4.iconfinder.com/data/icons/proglyphs-shopping-and-finance/512/Coin_-_Bitcoin-512.png'],
//       amount: 500,
//       currency: 'usd',
//       quantity: 1,
//     }],
//     success_url: '/register',
//     cancel_url: '/',
//   });
module.exports = {
  getCrypto(req, res) {

  	if(req.session.user)
  	{
  		Wallet.findOrCreate({
        where: {
          type : req.query.c,
  				userId : req.session.user.id
        },
        defaults: {
          type : req.query.c,
          userId : req.session.user.id,
          balance : 3342,
        }
      }).then(data=>{
              console.log(data);
  			    	return res.render('crypto', { data: data[0].balance, user: req.session.user, type: data[0].type });
  		});

  	}else
  	{
  		//redirects to API thingy
      return res.render('crypto', {  type: req.query.c });
      //res.redirect('/');
  	}
  	
  },
};