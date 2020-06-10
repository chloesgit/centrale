import tmdbsimple as tmdb
import json
tmdb.API_KEY = 'dea6272d1535762c973d2abb890d6f65'

bd = {}
élément=[]



for i in range (0,10):
    try: 
        Film=tmdb.Movies(i).info()
        dicoPut={}
        dicoItem={}
        dicoItem["type"]={"S":"Movie"}
        dicoItem["uuid"]={"S":str(i).replace("'","")}
        dicoItem["name"]={"S":str(Film['original_title']).replace("'","")}
        dicoItem["date de sortie"]={"S":str(Film['release_date']).replace("'","")}
        dicoItem["note"]={"S":str(Film['vote_average']).replace("'","")}
        dicoItem["résumé"]={"S":str(Film['overview']).replace("'","")}
        L=Film["genres"]
        genre = []
        for i in range(len(L)):
            genre.append(str(L[i]["name"]))
        dicoItem["enres"]={"L": genre}
        dicoItem["adult"]={"S":str(Film["adult"])}
        dicoPut["PutRequest"]=dicoItem
        élément.append(dicoPut)
    except : 
        continue
bd["cs-group-2-WassimM"]= élément
print(str(bd).replace("'",'"'))

with open('database2.json','w') as data:
    data.write(json.dump(str(bd).replace("'",'"'), data,indent=4))