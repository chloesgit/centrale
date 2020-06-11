import tmdbsimple as tmdb
import json
tmdb.API_KEY = 'dea6272d1535762c973d2abb890d6f65'

bd = {}
élément=[]



for i in range (0,10):
    try: 
        Film=tmdb.Movies(i).info()
        dicoBigger={}
        dicoPut={}
        dicoItem={}
        dicoItem["type"]={"S":"Movie"}
        dicoItem["uuid"]={"S":str(i).replace("'","")}
        dicoItem["name"]={"S":str(Film['original_title']).replace("'","")}
        dicoItem["release_date"]={"S":str(Film['release_date']).replace("'","")}
        dicoItem["vote_average"]={"S":str(Film['vote_average']).replace("'","")}
        dicoItem["overview"]={"S":str(Film['overview']).replace("'","").replace('"',"")}
        L=Film["genres"]
        genre = []
        for i in range(len(L)):
            genre.append(str(L[i]["name"]))
        dicoItem["genres"]={"SS": genre}
        dicoItem["adult"]={"S":str(Film["adult"])}
        dicoPut["Item"]=dicoItem
        dicoBigger["PutRequest"] = dicoPut
        élément.append(dicoBigger)
    except : 
        continue

bd["cs-group-2-WassimM-dynamodb"]= élément
print(str(bd).replace("'",'"'))

with open('database3.json','w') as data:
    print(json.dump(bd,data, indent=4))


#with open('database2.json','w') as data:
#    data.write(json.dump(str(bd).replace("'",'"'), data,indent=4))