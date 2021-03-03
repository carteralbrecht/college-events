create table if not exists Location
(
	id int auto_increment
		primary key,
	latitude double null,
	longitude double null,
	name varchar(45) null
);

create table if not exists University
(
	id int auto_increment
		primary key,
	name varchar(45) null,
	num_students int default 0 null,
	image_url varchar(45) null,
	Location_id int null,
	constraint University_Location_id_fk
		foreign key (Location_id) references Location (id)
);

create table if not exists RSO
(
	id int auto_increment
		primary key,
	name varchar(45) null,
	University_id int null,
	constraint RSO_University_id_fk
		foreign key (University_id) references University (id)
);

create table if not exists Event
(
	id int auto_increment
		primary key,
	name varchar(45) null,
	time datetime null,
	description varchar(45) null,
	type varchar(45) null,
	RSO_id int null,
	Location_id int null,
	constraint Event_Location_id_fk
		foreign key (Location_id) references Location (id),
	constraint Event_RSO_id_fk
		foreign key (RSO_id) references RSO (id)
);

create table if not exists User
(
	id int auto_increment
		primary key,
	password varchar(45) not null,
	University_id int null,
	firstname varchar(45) null,
	lastname varchar(45) null,
	email varchar(45) null,
	constraint User_email_uindex
		unique (email),
	constraint User_University_id_fk
		foreign key (University_id) references University (id)
);

create table if not exists Admin
(
	User_id int not null,
	RSO_id int null,
	constraint Admin_RSO_id_fk
		foreign key (RSO_id) references RSO (id),
	constraint Admin_User_id_fk
		foreign key (User_id) references User (id)
);

create table if not exists SuperAdmin
(
	User_id int not null
		primary key,
	constraint SuperAdmin_User_id_fk
		foreign key (User_id) references User (id)
);

create table if not exists User_MemberOf_RSO
(
	User_id int not null,
	RSO_id int not null,
	primary key (User_id, RSO_id),
	constraint User_MemberOf_RSO_RSO_id_fk
		foreign key (RSO_id) references RSO (id),
	constraint User_MemberOf_RSO_User_id_fk
		foreign key (User_id) references User (id)
);
