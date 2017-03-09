const db = require('./_conn');
const Sequelize = db.Sequelize;

const sync = () => db.sync({force: true});

const Place = db.define('place', {
	address: {
		type: Sequelize.STRING
	}, 
	city: {
		type: Sequelize.STRING
	},
	state: {
		type: Sequelize.STRING
	},
	phone: {
		type: Sequelize.STRING
	}, 
	location: {
		type: Sequelize.ARRAY(Sequelize.DataTypes.FLOAT)
	} 
});

const Hotel  = db.define('hotel', {
	name: {
		type: Sequelize.STRING
	}, 
	num_stars: {
		type: Sequelize.FLOAT
	},
	amenities: {
		type: Sequelize.STRING
	} 
});

const Activity = db.define('activity', {
	name: {
		type: Sequelize.STRING
	},
	age_range: {
		type: Sequelize.STRING
	} 
});

const Restaurant = db.define('restaurant', {
	name: {
		type: Sequelize.STRING
	},
	cuisine: {
		type: Sequelize.STRING
	},
	price: {
		type: Sequelize.INTEGER
	}
});

Hotel.belongsTo(Place);
Restaurant.belongsTo(Place);
Activity.belongsTo(Place);

module.exports = {
	models: {
		Place,
		Hotel,
		Activity, 
		Restaurant
	},
	sync
};