#!/usr/bin/env python3
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
                    res=m[i]+(s1/s2)
                    if res>0:
                        R[i,x]=res
                        
                    else:
                        R[i,x]=0
            else:
                R[i,x]=M[i,x]
    return R 

M=np.array([[1,0,3],[5,2,0],[0,5,7]])
S=similarite(M)
print(S)
print(predictions(M,S))
