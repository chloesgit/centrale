# importing the requests library 
import requests 
import csv
import os
import json
import numpy as np
import pandas as pd
from scipy import stats

from sklearn import model_selection 
from sklearn.metrics.pairwise import pairwise_distances

# api-endpoint 
URL = "https://cwc0sbvgf4.execute-api.eu-west-1.amazonaws.com/"
  
# location given here 

  
# defining a params dict for the parameters to be sent to the API 

# sending get request and saving the response as response object 
r = requests.get(url = URL) 
  
# extracting data in json format 
data = r.json() 

  
  
# extracting latitude, longitude and formatted address  
# of the first matching location 

  


d = [[ x['name'], x['Film'], x['Note'] ] for x in data  ]

UNames = list(set([x['name'] for x in data])) 
UFilms = list(set([x['Film']for x in data]))


dicIDNames = { UNames[i]: i for i in range(len(UNames))}
dicIDFilms = { UFilms[i]: i for i in range(len(UFilms))}
d1 = [[ dicIDNames[x['name']], dicIDFilms[x['Film']], x['Note']/2 ] for x in data  ]

with open('innovators.csv', 'w', newline='') as file:
    writer = csv.writer(file, delimiter=',')
    writer.writerows(d1)

def predict(ratings, similarity, type='user'):
    
    if type == 'user':
        mean_user_rating = ratings.mean(axis=1)
        #You use np.newaxis so that mean_user_rating has same format as ratings
        ratings_diff = (ratings - mean_user_rating[:, np.newaxis])

        pred = mean_user_rating[:, np.newaxis] + similarity.dot(ratings_diff) / np.array([np.abs(similarity).sum(axis=1)]).T
    elif type == 'item':
        pred = ratings.dot(similarity) / np.array([np.abs(similarity).sum(axis=1)])
    return pred



data_cols = ['user_id','item_id','rating','timestamp']



data = pd.read_csv('innovators.csv', sep=',',names=data_cols, encoding='latin-1',engine='python')




nb_users = data.user_id.unique().shape[0]
nb_items = data.item_id.unique().shape[0]

train_data, test_data = model_selection.train_test_split(data, test_size=0.01)
train_data = data
movie_matrix = train_data.pivot_table(index='user_id', columns='item_id', values='rating')
train_data_matrix = np.zeros((nb_users, nb_items))

for line in train_data.itertuples():
    
    train_data_matrix[line[1]-1, line[2]-1] = line[3]
    test_data_matrix = np.zeros((nb_users, nb_items))
for line in test_data.itertuples():
    test_data_matrix[line[1]-1, line[2]-1] = line[3]

user_similarity = pairwise_distances(train_data_matrix, metric='cosine')

ratings = pd.DataFrame(data.groupby('item_id')['rating'].mean())
ratings['number_of_ratings'] = data.groupby('item_id')['rating'].count()



user_prediction = predict(train_data_matrix, user_similarity, type='user')
















import numpy as np
import math as math
def similarite(M):
    m=[]
    k,l=np.shape(M)[0],np.shape(M)[1]
    for i in range(k):
        s=0
        t=0
        for j in range(l):
            if not(M[i,j]==0):
                t+=1
                s+=M[i,j]
        m.append(s/t)
    S=np.zeros((k,k))
    for i in range(k):
        for j in range(k):
            s1=0
            s2=0
            s3=0
            for f in range(l):
                if not(M[i,f]==0) and not(M[j,f]==0):
                    s1+=(M[i,f]-m[i])*(M[j,f]-m[j])
                    s2+=(M[i,f]-m[i])**2
                    s3+=(M[j,f]-m[j])**2
            if s1==0 and s2==0 and s3==0:
                S[i,j]=0
            else:
                S[i,j]=s1/math.sqrt(s2*s3)
    return S
def tri_bulle(l):
    n = len(l)
    # Traverser tous les éléments du tableau
    for i in range(n):
        for j in range(0, n-i-1):
            # échanger si l'élément trouvé est plus grand que le suivant
            if l[j][0] > l[j+1][0] :
                l[j], l[j+1] = l[j+1], l[j]
    s = 0
    l2=[]
    for i in range(n):
        s -= 1
        l2.append(l[s])
    return l2
def predictions(M,S):
    m=[]
    k,g=np.shape(M)[0],np.shape(M)[1]
    for i in range(k):
        s=0
        t=0
        for j in range(g):
            if not(M[i,j]==0):
                t+=1
                s+=M[i,j]
        m.append(s/t)
    R=np.zeros((k,g))
    for i in range(k):
        l=[]
        for j in range(k):
            if not(j==i):
                l.append([S[i,j],j])
                
        l=tri_bulle(l)
        
        t=0
        u=0
        while (t<len(l)) and (l[t][0]>0):
            u+=1
            t+=1
        s1=0
        s2=0
        for x in range(g):
            for v in range(min(u,5)):
                s1+=S[i,l[v][1]]*(M[j,x]-m[l[v][1]])
                s2+=abs(S[i,l[v][1]])
            if M[i,x]==0:
                    if(s2 == 0) :
                        res = m[i]
                    else:
                         res=m[i]+(s1/s2)
                    if res>0:
                        R[i,x]=res
                        
                    else:
                        R[i,x]=0
            else:
                R[i,x]=M[i,x]
    return R 

M=train_data_matrix
S=similarite(M)
print(S)
print(predictions(M,S))


user_prediction = predictions(M,S)

res = [[UNames[i],UFilms[j], user_prediction[i,j]] for i in range(user_prediction.shape[0]) for j in  range(user_prediction.shape[1])]
maxF = user_prediction.shape[1]




def min(a,b):
    if (a<b) :return a
    return b
res2 = { x : sorted([(y[1],y[2]) for y in res if y[0] == x],key= lambda x:x[1],  reverse=True )[:min(maxF,6)] for x in UNames}
res3 = {x :  [res2[x][i][0] for i in range(len(res2[x]))]  for x in UNames }








element = []
bd = {}
i=0

for x  in res3:
    
    try: 
        dicoPut={}
        dicoItem={}
        dicoItem['type']={"S":"rec"}
        dicoItem['name']={"S":x }
        dicoItem['uuid']={"S":x}

        dicoItem['genres']={"SS": res3[x]}
        dicoPut["PutRequest"]={"Item":dicoItem}
        element.append(dicoPut)
        i = i+1
    except : 
        continue
bd["cs-group-2-wassimFinal-dynamodb"]=element

print(bd)
with open('database.json','w') as data:
    data.write(json.dumps(bd, indent=4))



os.system("aws dynamodb batch-write-item --request-items file://database.json")