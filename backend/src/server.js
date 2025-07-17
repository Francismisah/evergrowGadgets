require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const cors = require('cors');
const connectDB = require('./config/database');
const { typeDefs, resolvers } = require('./graphql');
const authMiddleware = require('./middleware/auth.middleware');
const errorMiddleware = require('./middleware/error.middleware');
const routes = require('./routes');
const passport = require('./config/passport');
const session = require('express-session');
const { env } = require('./config/env');
const { graphqlUploadExpress } = require('graphql-upload');
const multer = require('multer');
const path = require('path');

const app = express();

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

// Middleware
app.use(
  session({
    secret: env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(authMiddleware);
app.use('/uploads', express.static(path.join(__dirname, 'Uploads')));
app.use('/api', routes);
app.use(graphqlUploadExpress({ maxFileSize: 5 * 1000 * 1000, maxFiles: 1 }));

// Google OAuth routes
app.get('/api/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get(
  '/api/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    const { token } = req.user;
    res.redirect(`http://localhost:3000/auth/callback?token=${token}`);
  }
);

// Start Apollo Server
const startServer = async () => {
  try {
    await connectDB();

    const server = new ApolloServer({
      typeDefs,
      resolvers,
    });

    await server.start();

    app.use(
      '/graphql',
      expressMiddleware(server, {
        context: async ({ req }) => ({ user: req.user, upload }),
      })
    );

    app.use(errorMiddleware);

    const PORT = env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}/graphql`);
    });
  } catch (error) {
    console.error('Server startup error:', error);
    process.exit(1);
  }
};

startServer();