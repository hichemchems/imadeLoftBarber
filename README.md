# ImadLoftBarber - Node.js Template for o2switch Deployment

This is a minimal Node.js application template designed for deployment on o2switch hosting with Phusion Passenger.

## Features

- Express.js backend
- MySQL database connection
- Static frontend with blue background and white "Hello World"
- Passenger configuration for o2switch
- Environment variables setup

## Project Structure

```
imadloftbarber-template/
├── package.json          # Node.js dependencies
├── server.js             # Express server with MySQL connection
├── Passengerfile.json    # Passenger configuration
├── .htaccess             # Apache configuration for Passenger
├── public/
│   └── index.html        # Frontend with Hello World
└── README.md             # This file
```

## Environment Variables (o2switch)

The following environment variables are configured in `.htaccess`:

- `DB_HOST`: localhost
- `DB_NAME`: dije1636_loft-barbe-db
- `DB_PASSWORD`: password@password.password
- `DB_PORT`: 3306
- `DB_USER`: dije1636_imad-coiffeur
- `JWT_EXPIRE`: 10d
- `JWT_SECRET`: ber-jwt-secret-production-2024-secure-key-change-this
- `NODE_ENV`: production
- `PASSENGER_APP_ENV`: production
- `BCRYPT_ROUNDS`: 12

## Deployment Steps for o2switch

### 1. Prepare the Application Locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Test locally (optional):
   ```bash
   npm start
   ```

### 2. Upload to o2switch via FTP/SFTP

Upload all files to your o2switch hosting account, typically to the `public_html` directory or a subdomain directory.

### 3. Setup MySQL Database in cPanel

1. Go to cPanel > MySQL Databases
2. Create a new database: `dijedatabase_loft-barbe-db`
3. Create a database user: `dijedatabase_imad-coiffeur` with password `password@password.password`
4. Add the user to the database with ALL PRIVILEGES

### 4. Setup Node.js App in cPanel

1. Go to cPanel > Setup Node.js App
2. Create Application:
   - Node.js version: 20 (recommended)
   - Application mode: Production
   - Application root: `/home/dijedatabase/imadloftbarber` (adjust path)
   - Application URL: Choose your domain/subdomain
   - Application startup file: `server.js`
   - Passenger log file: `log/passenger.log`
3. Add Environment Variables (if needed):
   - DB_HOST: localhost
   - DB_NAME: dije1636_loft-barbe-db
   - DB_PASSWORD: password@password.password
   - DB_USER: dije1636_imad-coiffeur
   - NODE_ENV: production
4. Click "Create"
5. Run `npm install` in the application

### 5. Install Dependencies via SSH

Connect to your o2switch account via SSH and run:

```bash
cd /home/dijedatabase/imadloftbarber  # Adjust path
source /home/dijedatabase/nodevenv/imadloftbarber/20/bin/activate  # Adjust paths
npm install
```

### 6. Start the Application

In cPanel > Setup Node.js App, click "Restart" for your application.

### 7. Test the Deployment

Visit your domain/subdomain to see the "Hello World" page.

Test the database connection: `https://yourdomain.com/api/test-db`

## Next Steps: Implement Todo App "imadLoftbarber"

After successful deployment of this template, implement the following features:

### Backend Features
- [ ] User authentication (JWT)
- [ ] Todo CRUD operations
- [ ] Database schema for todos
- [ ] API endpoints:
  - GET /api/todos
  - POST /api/todos
  - PUT /api/todos/:id
  - DELETE /api/todos/:id

### Frontend Features
- [ ] Todo list display
- [ ] Add new todo form
- [ ] Edit todo functionality
- [ ] Delete todo functionality
- [ ] Mark todo as complete/incomplete
- [ ] Responsive design

### Database Schema
```sql
CREATE TABLE todos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## Troubleshooting

### Common Issues
1. **Application not starting**: Check Passenger logs in cPanel > Setup Node.js App
2. **Database connection error**: Verify database credentials in environment variables
3. **Dependencies not installed**: Run `npm install` via SSH with activated Node.js environment
4. **Port issues**: Passenger handles port binding automatically, no need to specify port in code

### Logs
- Passenger logs: Check in cPanel > Setup Node.js App
- Application logs: Check `log/passenger.log` file
- Enable debug mode by adding to `.htaccess`:
  ```
  PassengerAppEnv development
  PassengerFriendlyErrorPages on
  PassengerAppLogFile "/home/username/log/error.log"
  ```

## Support

For o2switch specific issues, refer to their documentation:
- https://docs.o2switch.fr/hebergement-web/bases-de-donnees/mysql/
- https://docs.o2switch.fr/langages/node-js/
# imadeLoftBarber
