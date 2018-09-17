if (process.env.NODE_ENV === 'production') {
  module.exports = {
    mongoURI:
      'mongodb://donna:fr3dd13Cat@ds159772.mlab.com:59772/storycrumb-prod'
  };
} else {
  module.exports = {
    mongoURI: 'mongodb://donna:test123@ds155252.mlab.com:55252/story-crumb'
  };
}
