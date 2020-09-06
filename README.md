# security-reference-architecture
A reference architecture which implements security best practices

As of 06/09/2020 some of the resources associated with this project have been removed, to reproduce use the following templates:

1. RDS

AWS RDS MYSQL

Instance Identifier = refarch-mysql-db
Region = eu-west-1c
Size = db.t2.micro

mysql> show tables;
+---------------------+
| Tables_in_refarchdb |
+---------------------+
| accounts            |
+---------------------+

mysql> desc accounts;
+----------+-------------+------+-----+---------+-------+
| Field    | Type        | Null | Key | Default | Extra |
+----------+-------------+------+-----+---------+-------+
| username | varchar(20) | YES  |     | NULL    |       |
| password | varchar(25) | YES  |     | NULL    |       |
| email    | varchar(30) | YES  |     | NULL    |       |
+----------+-------------+------+-----+---------+-------+

Add 2 or 3 entries.

Deletion Protection = True

2. Data in Secret Manager

Secret Name = mysql_secrets

List of Secret Keys/Values
	user = DB user
	password = DB password
	engine = mysql
	hostname = DB endpoint
	port = 3306
	dbinstanceidentifier = refarch-mysql-db
	name = DB name(refarchdb)
	
3. ECR

Repository Name = refarch-repo

Store dependency-track image here.

Pull from here: owasp/dependency-track

4. ECS Cluster

Create ECS cluster (Fargate) using the previously created ECR.
Name = refarch-cluster

Ensure the access to the internet is provided (port 8080).

5. ECS Task

Create and run an ECS Fargate task.
Name = refarch-task

At this point access to dependency-track login page is attainable
    <Public IP>:8008