import tmdbsimple as tmdb
import json
tmdb.API_KEY = 'dea6272d1535762c973d2abb890d6f65'

bd = {}
élément=[]



for i in range (50,80):
    try: 
        Film=tmdb.Movies(i).info()
        dicoBigger={}
        dicoPut={}
        dicoItem={}
        dicoItem["type"]={"S":"Movie"}
        dicoItem["uuid"]={"S":str(i)}
        dicoItem["title"]={"S":str(Film['original_title'])}
        dicoItem["release_date"]={"S":str(Film['release_date'])}
        dicoItem["vote_average"]={"S":str(Film['vote_average'])}
        dicoItem["overview"]={"S":str(Film['overview'])}
        dicoItem["poster_path"]={"S":str(Film['poster_path'])}
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

bd["cs-group-2-seifeddine-dynamodb"]= élément





with open('/Users/seifbouguila/Desktop/theodo/centrale/backend/database2.json','w') as data:
   
    data.write(json.dumps(bd, indent=4))