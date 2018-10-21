create database instant_alert;

use instant_alert;
drop database instant_alert;
create table user_table(user_id int auto_increment,
						username char(50) not null,
                        first_name char(50) not null,
                        last_name char(50) not null,
                        salt char(100),
                        hashed_password char(100),
                        primary key (user_id));
					
create table incident_table(incident_id int auto_increment,
						user_id int,
						longtitude float,
                        latitude float,
                        upVote int,
                        downVote int,
                        color int,
                        message char(200),
                        primary key (incident_id),
                        foreign key incident_table(user_id) references user_table(user_id));
