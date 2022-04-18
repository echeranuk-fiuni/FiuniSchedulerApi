-- Database: fiuni_scheduler

--DROP DATABASE IF EXISTS fiuni_scheduler;
--CREATE DATABASE fiuni_scheduler
--    WITH 
--    OWNER = postgres
--    ENCODING = 'UTF8'
--    LC_COLLATE = 'Spanish_Paraguay.1252'
--    LC_CTYPE = 'Spanish_Paraguay.1252'
--    TABLESPACE = pg_default
--    CONNECTION LIMIT = -1;
	
-- Table: public.users

DROP TABLE IF EXISTS public.users CASCADE;
CREATE TABLE IF NOT EXISTS public.users
(
    id SERIAL NOT NULL,
    first_name character varying(30) COLLATE pg_catalog."default" NOT NULL,
    last_name character varying(30) COLLATE pg_catalog."default" NOT NULL,
    username character varying(30) COLLATE pg_catalog."default" NOT NULL,
    password character varying(30) COLLATE pg_catalog."default" NOT NULL,
    role character varying(12) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT user_pkey PRIMARY KEY (id),
    CONSTRAINT user_username_key UNIQUE (username)
);
ALTER TABLE IF EXISTS public.users
    OWNER to postgres;
	
-- Table: public.entries

DROP TABLE IF EXISTS public.entries CASCADE;
CREATE TABLE IF NOT EXISTS public.entries
(
    id SERIAL NOT NULL,
    user_id integer NOT NULL,
    title character varying(50) COLLATE pg_catalog."default" NOT NULL,
    description text COLLATE pg_catalog."default",
    datetime character varying(23) COLLATE pg_catalog."default",
    type character varying(12) COLLATE pg_catalog."default" NOT NULL,
    status character varying(12) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT entries_pkey PRIMARY KEY (id),
    CONSTRAINT entries_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

ALTER TABLE IF EXISTS public.entries
    OWNER to postgres;

-- Create main user

INSERT INTO public.users(
	first_name, last_name, username, password, role)
	VALUES ('admin', 'admin', 'admin', 'admin', 'ADMIN');