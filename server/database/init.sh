#!/bin/bash

# check if the `mysql` program is installed
if ! command -v mysql &> /dev/null;then
  echo "mysql is not available or is not installed"
  exit
fi

# import the database basic shape
sudo mysql < database.sql

# import the database tables
sudo mysql < tables.sql

# generate the map with 400 cells
sudo mysql < populate-map.sql
echo "USE ccs; CALL PopulateMap(400);" | sudo mysql

# insert test users and data
sudo mysql < insert-dummies.sql
