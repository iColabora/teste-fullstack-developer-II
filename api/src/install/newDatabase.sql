CREATE TABLE IF NOT EXISTS form (
    id int not null auto_increment primary key,
    name varchar(255),
    description text,
    created_at datetime,
    created_from varchar(255),
    updated_at datetime,
    updated_from varchar(255)
) engine = INNODB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS form_field (
    id int not null auto_increment primary key,
    id_form int,
    type varchar(20),
    name varchar(255),
    personal_id varchar(50),
    description text,
    default_value text (255),
    maxlength int default 255,
    required boolean default false,
    created_at datetime,
    created_from varchar(255),
    updated_at datetime,
    updated_from varchar(255),
    foreign key (id_form) references form (id) on delete cascade
) engine = INNODB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS form_field_option (
    id int not null auto_increment primary key,
    id_form_field int,
    label varchar(255),
    value text (255),
    foreign key (id_form_field) references form_field (id) on delete cascade
) engine = INNODB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS form_answer (
    id int not null auto_increment primary key,
    id_form int,
    id_form_field int,
    value varchar(255),
    created_at datetime,
    created_from varchar(255),
    updated_at datetime,
    updated_from varchar(255),
    foreign key (id_form) references form (id) on delete cascade,
    foreign key (id_form_field) references form_field (id) on delete cascade
) engine = INNODB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;