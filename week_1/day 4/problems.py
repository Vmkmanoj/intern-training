class Solution:
    def isSubsequence(self, s: str, t: str) -> bool:

        fist = 0
        sec = 0

        while len(s) > fist and len(t) > sec:

            if s[fist] == t[sec]:
                fist+=1
            
            sec+=1

        if fist == len(s):
            return True
        

        return False