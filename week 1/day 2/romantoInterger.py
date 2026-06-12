class Solution:
    def intToRoman(self, num: int) -> str:

        roman = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I']
        nums  = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1]

        val = ""

        for index , i in enumerate(nums):
            while num >= i:
                num-=nums[index]
                val += str(roman[index])
             

        return val
    
    def romanToInt(self, s: str):

        dic = {
            'I' : 1,
            'V' : 5,
            'X' : 10,
            'L' : 50,
            'C' : 100,
            'D' : 500,
            'M' : 1000,
        }
        
        ans = 0
        for i in range(len(s)-1):
            if dic.get(s[i]) < dic.get(s[i+1]):
                ans-=dic.get(s[i])
            else:
                ans+=dic.get(s[i])
                
        ans += dic.get(s[-1])

        return ans

def main():
    sol = Solution()
    va = sol.intToRoman(1043)
    print(va)

if __name__ == "__main__":
    main()