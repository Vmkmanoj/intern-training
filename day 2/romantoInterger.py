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
    
def main():
    sol = Solution()
    va = sol.intToRoman(1043)
    print(va)

if __name__ == "__main__":
    main()