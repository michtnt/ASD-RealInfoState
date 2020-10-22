## Author: Michelle Tanoto
## TO INSERT FAKE DATA TO DATABASE

from bs4 import BeautifulSoup
import pymongo
import dns
import bcrypt

myclient = pymongo.MongoClient("mongodb+srv://Michelle:asdsucks@cluster0.dviis.mongodb.net/RealInfoState?retryWrites=true&w=majority")
mydb = myclient["RealInfoState"]

## USERS
myuser = mydb["users"]
password = "abcd1234"
myuser.insert_one({ "firstName" : "Michelle", "lastName" : "Tanoto", "email" : "13175144@student.uts.edu.au", "address" : "Chatswood, Sydney", "username" : "Michelle_123" ,"password" : bcrypt.hashpw(password, bcrypt.gensalt()) })
myuser.insert_one({ "firstName" : "Felix", "email" : "felix240600@gmail.com", "address" : "Strathfield, Sydney","username" : "Felix000" ,"password" : bcrypt.hashpw(password, bcrypt.gensalt()) })
myuser.insert_one({ "firstName" : "Oscar", "lastName" : "Tian", "email" : "13390657@student.uts.edu.au", "address" : "Zetland, Sydney", "username" : "Oscar_80" ,"password" : bcrypt.hashpw(password, bcrypt.gensalt()) })
myuser.insert_one({ "firstName" : "Frank", "lastName" : "Moe", "email" : "jiangjiahao0326@gmail.com", "address" : "Central, Sydney", "username" : "Frank97" ,"password" : bcrypt.hashpw(password, bcrypt.gensalt()) })

## ADMINS
myadmin = mydb["admins"]
password = "abcd1234"
myadmin.insert_one({ "firstName" : "John", "lastName" : "Doe", "email" : "johndoe@gmail.com", "username" : "John_admin" ,"password" : bcrypt.hashpw(password, bcrypt.gensalt()) })
myadmin.insert_one({ "firstName" : "Frank", "email" : "frank0@gmail.com", "username" : "Frank_admin" ,"password" : bcrypt.hashpw(password, bcrypt.gensalt()) })

## PROPERTIES
myproperty = mydb["properties"]
myproperty.insert_one({ "name" : "Cassia", "coordinate" : "37°14′28″S,-37.24105507,89°58′07″E,89.96860075", "description" : "With the pulse of downtown Sydney at the doorstep, this fresh and bright apartment offers a perfect city pad or investment in a vibrant inner city setting renowned as the city's most creative arts precinct. An elevated setting on level five of an architect-redesigned block affords a cool urban outlook with an east facing deck that captures the morning sunshine and floor to ceiling windows maximising natural light. Newly refreshed interiors and a spacious 46sqm layout make for comfortable city living with level lift access and Spice Alley's celebrated dining hub just around the corner. Stroll to Central Park's shopping centre, Chippendale Green, UTS and Chippendale's renowned galleries such as White Rabbit, MOP Projects and Pine Street Creative Arts Centre.", "address" : "Chatswood, Sydney", "price" : 575000 ,"size" : 46 , "type": "Apartment"})
myproperty.insert_one({ "name" : "Ray White", "coordinate" : "26°21′33″N,26.3591914,135°43′18″W,-135.72154851","description" : "A scenic, generously sized, modern apartment located in the heart of Central Park. This beautiful apartment makes an ideal home for young couples who seek convenience and diversity whether it be through efficient commutes, diverse eateries, speciality stores and even renowned universities.", "address" : "Strathfield, Sydney","price" : 30000 ,"size" : 35, "type": "Cottage"})
myproperty.insert_one({ "name" : "Bulls Property", "coordinate" : "15°40′58″S,-15.68290332,86°22′55″W,-86.38199636", "description" : "Smartly updated to give it extra appeal, this well-proportioned one-bedroom apartment set in the famous 'Dolphin Square' with Pool, Gym and Sauna delivers an ideal low maintenance retreat complemented by a top location that's right in the heart of Chippendale. Tastefully presented with bright interiors, it offers a ready-made living space that's perfect for those looking for a convenient lifestyle tucked away close to everything. This is an impressive security building, just a short stroll to Broadway Shopping Centre, Central Park, Railway Square, Victoria Park, Sydney University/UTS and Darling Harbour.", "address" : "Zetland, Sydney", "price" : 120000 , "size" : 80, "type": "House"})
myproperty.insert_one({ "name" : "Gardenia", "coordinate" : "26°22′38″S,-26.37725117,126°20′24″W,-126.34010119", "description" : "An excellent opportunity for a savvy investor, this studio apartment enjoys a central location within walking distance of Sydney University, UTS, Central train station, and Sydney's CBD. Trendy cafes, pubs, and restaurants are right at your doorste", "address" : "Central, Sydney", "price" : 60000 ,"size" : 60, "type" : "Penthouse"})

## AUTOMATE PROPERTIES INPUT
for x in range(25):
    name = raw_input("Name of property")
    coordinate = raw_input("Coordinate of property")
    description = raw_input("Description of property")
    address = raw_input("Address of property")
    price = raw_input("Price of property")
    size = raw_input("Size of property")
    type = raw_input("type of property")
    myproperty = mydb["properties"]
    myproperty.insert_one({ "name": name, "coordinate": coordinate, "description": description, "address": address, "price": price, "size": size, "type": type})


## SUBURBS
mysuburb = mydb["suburbs"]
mysuburb.insert_one({ "name" : "Chippendale", "crimeRate" : 10.33, "atarAverage" : 93.70, "averagePropertyCost" : 50230, "description" : "Chippendale is a small inner-city suburb of Sydney, New South Wales, Australia on the southern edge of the Sydney central business district, in the local government area of the City of Sydney. Chippendale is located between Broadway to the north and Cleveland Street to the south, Sydney Central railway station to the east and the University of Sydney to the west.","transportRate" : 80.20 ,"satisfactionRate" : 98.52, "parkingRate": 23.60})
mysuburb.insert_one({ "name" : "Granville", "crimeRate" : 15.80, "atarAverage" : 87.30, "averagePropertyCost" : 100300, "description" : "Granville is a suburb in western Sydney, in the state of New South Wales, Australia. Granville is located 18 kilometres (11 mi) west of the Sydney central business district, split between the local government areas of Cumberland City Council and the City of Parramatta.","transportRate" : 70.23 ,"satisfactionRate" : 80.20, "parkingRate": 40.30})
mysuburb.insert_one({ "name" : "Strathfield", "crimeRate" : 20.3, "atarAverage" : 80.23, "averagePropertyCost" :  62300, "description" : "Strathfield is a suburb in the Inner West of Sydney, in the state of New South Wales, Australia. It is located 12 kilometres west of the Sydney central business and is the administrative centre of the Municipality of Strathfield. A small section of the suburb north of the railway line lies within the City of Canada Bay, while the area east of The Boulevard lies within the Municipality of Burwood. North Strathfield and Strathfield South are separate suburbs to the north and south, respectively.","transportRate" : 30.23 ,"satisfactionRate" : 78.20, "parkingRate": 80.30})

## AUTOMATE SUBURBS INPUT
for x in range(25):
    name = raw_input("Name of suburb")
    crime = raw_input("Crime rate of suburb")
    atar = raw_input("Average atar of suburb")
    property = raw_input("Average property of suburb")
    description = raw_input("Description of suburb")
    transport = raw_input("Transport rate of suburb")
    satisfaction = raw_input("Satisfaction rate of suburb")
    parking = raw_input("Parking rate of suburb")
    mysuburb = mydb["suburbs"]
    mysuburb.insert_one({ "name": name, "crimeRate": crime, "description": description, "atarAverage": atar, "averagePropertyCost": property, "transportRate" : transport, "parkingRate": parking, "satisfactionRate" : satisfaction})

