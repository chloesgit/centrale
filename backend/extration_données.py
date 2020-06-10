import tmdbsimple as tmdb
import json
tmdb.API_KEY = 'dea6272d1535762c973d2abb890d6f65'

bd = {}
élément=[]



for i in range (20,2020):
    try: 
        Film=tmdb.Movies(i).info()
        dicoPut={}
        dicoItem={}
        dicoItem['type']={"S":"Movie"}
        dicoItem['uuid']={"S":str(i)}
        dicoItem['name']={"S":Film['original_title']}
        dicoItem['date de sortie']={"S":Film['release_date']}
        dicoItem['note']={"S":str(Film['vote_average'])}
        dicoItem['résumé']={"S":Film['overview']}
        L=Film['genres']
        genre = []
        for i in range(len(L)):
            genre.append(L[i]['name'])
        dicoItem['genres']={"SS": genre}
        dicoItem['adult']={"S":str(Film['adult'])}
        dicoPut["PutRequest"]={"Item":dicoItem}
        élément.append(dicoPut)
    except : 
        continue
bd[
    "cs-group-2-chloes-dynamodb"]=élément

with open('database.json','w') as data:
    data.write(json.dumps(bd, indent=4))

