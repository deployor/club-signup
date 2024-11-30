<h1 align="center">Club Signup</h1>

![Banner](https://files.catbox.moe/ewlkfh.png)

<p align="center">
This project is a simplified version of a previous voting app I created for highseas but havent published. I realized that the project might be difficult for people to understand, so I made a new repository with modifications to make it easier to demo.  You can find the other repositories on my profile they are all the same *project* to me though. This is not an update to the original project, but both repos are open. Its more purpose relevant to HackClub! First time dealing with production DB! 🤔
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#quick-start">Quick Start</a> •
  <a href="#deployment">Deployment</a> •
  <a href="#configuration">Configuration</a> •
  <a href="#license">License</a>
</p>

## Features

- 🔐 Microsoft/Azure authentication
- 🎨 Clean UI with Tailwind CSS
- 📱 Fully responsive design
- ⚡ Fast and reliable with Next.js

## Quick Start

1. Clone the repository
```shell
git clone https://github.com/yourusername/hack-club-signup
cd hack-club-signup
```

2. Install dependencies
```shell
npm install
```

3. Configure your environment variables:
```shell
cp .env.example .env.local
``` 

4. Configure your environment variables:
```shell
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
NEXT_PUBLIC_ALLOWED_EMAIL_DOMAIN=your-school-domain.com
```

5. Build
```shell
npm run build
``` 

5. Start
```shell
npm run start
``` 

## Config

1. Supabase Setup
      Create a new Supabase project
      Run this SQL to create required table:
      Also make sure to remvoe the email check line if u wanna allow any domain!
      
```sql
-- TABLE
CREATE TABLE signups (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  email TEXT NOT NULL UNIQUE,
  signed_up BOOLEAN DEFAULT FALSE,
  CONSTRAINT valid_email CHECK (email LIKE '%@fbi.gov') // Remove this row if u dont want to check mail domains
);

-- RLS
ALTER TABLE signups ENABLE ROW LEVEL SECURITY;

--  policy
CREATE POLICY "Users can view own signup" ON signups
  FOR SELECT USING (auth.email() = email);

-- polidy
CREATE POLICY "Users can insert own signup" ON signups
  FOR INSERT WITH CHECK (auth.email() = email);

-- policy
CREATE POLICY "Users can update own signup" ON signups
  FOR UPDATE USING (auth.email() = email);

-- policy
CREATE INDEX signups_email_idx ON signups(email);
``` 
Now simply head to the authentication tab (lock symbol) and disable email and enable azure!

2. Azure Setup
      1. Go to Azure Portal
      2. Go to EntraID and create a new app regestration!
      3. Set the redirect URI to https://your-domain.com/callback  (you find it in the auth tab for azure in supabase)
      4. Allow everyone to signup no matter the domain, somehow it breaks if u dont!
      5. Add a new client secret by going to Secrets and creating a new one and copy the value.
      6. Go to the API permissions tab and add the following permissions from Microsoft Graph and Delegated permissions:
          - User.Read
          - email
          - openid
          - profile
      7. Enable Azure in Supabase using the value from the Secret u crerated and the Application ID which u find in the Overview!


## Deployment
Deploy to Render.com (Free)
1. Fork this repository
2. Create a new Web Service on Render
3. Connect your GitHub repository
4. Add your environment variables
5. Deploy!

## LICENSE
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
