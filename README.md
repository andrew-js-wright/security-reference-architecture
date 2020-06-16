# security-reference-architecture
A reference architecture which implements security best practices

Initially create a simple login application using node js, with a MySQL backend.

This application will run locally and contains trivial credentials. These credentials are intentially insecure as they are not used for a real operating system.

REQUIREMENTS

1. MySQl
2. Node.js
3. Express (npm install express)
4. Express Sessions (npm install express-session)
5. MySQL for Node (npm install mysql)
6. gitleaks 3.0.3 or higher;
    # Install
    brew install gitleaks
    brew upgrade gitleaks

The initial configuration relies heavily on;
https://codeshack.io/basic-login-system-nodejs-express-mysql/

Secrets implementation;
https://github.com/KainosSoftwareLtd/secret-scanning