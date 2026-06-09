class Solution:
    def middleNode(self, head: Optional[ListNode]) -> Optional[ListNode]:
        
        dummy = head

        count = 1
        while dummy.next is not None:
            dummy = dummy.next
            count+=1

        dummy2 = head
        for i in range(count//2):

            dummy2 = dummy2.next

        return dummy2