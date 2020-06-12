# -*- coding: utf-8 -*-
"""
Created on Fri Jun 12 04:18:17 2020

@author: seifbouguila
"""
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
def tri_bulle(tab):
    n = len(tab)
    # Traverser tous les éléments du tableau
    for i in range(n):
        for j in range(0, n-i-1):
            # échanger si l'élément trouvé est plus grand que le suivant
            if tab[j][0] > tab[j+1][0] :
                tab[j], tab[j+1] = tab[j+1], tab[j]
                
    return tab.reverse()
def predictions(M,S):
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
    R=np.zeros((k,l))
    for i in range(k):
        l=[]
        for j in range(k):
            if not(j==i):
                l.append([S[i,j],j])
        l=tri_bulle(l)
        t=0
        u=0
        while (l[t][0]>0) and (t<len(l)):
            u+=1
            t+=1
        s1=0
        s2=0
        for x in range(l):
            for v in range(min(u,5)):
                s1+=S[i,l[v][1]]*(M[j,x]-m[l[v][1]])
                s2+=abs(S[i,l[v][1]])
            R[i,x]=m[i]+(s1/s2)
    return R 

M=np.array([[1,2,3],[5,2,3],[6,5,7]])
S=similarite(M)
print(predictions(M,S))
