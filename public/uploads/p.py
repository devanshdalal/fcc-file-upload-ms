
import random
from fractions import gcd


n = 10000
M= 10**9


tests=100


total_ops=0
test_no=0

while(test_no<tests):

	arr = [random.randint(1,M) for i in range(n)]

	arr.sort()

	ops=0;

	i,j=0,0

	LCM = 10**18;

	while i<n:
		j=i+1
		while j<n and arr[j]<LCM:

			LCM= min(LCM,arr[i]*arr[j]/gcd(arr[i],arr[j]))
			ops+=1

			j+=1
		i+=1

	total_ops+=ops
	print('n=',n,' ops=',ops,' ops/n=',ops*1.0/n)
	test_no+=1

print('overall: n=',n,' total_ops=',total_ops,' ops/n(avg)=',total_ops*1.0/(n*tests))




