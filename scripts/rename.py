import os 

# Function to rename multiple files 
def main(): 
    nombres=set()
    for count, filename in enumerate(os.listdir("crops_op_real_2249")):
        src ='crops_op_real_2249/'+ filename
        name = filename.split('_')[1] 
        dst ='crops_op_real_2249/'+ name 
          
        # rename() function will 
        # rename all the files
        if not name in nombres:
            os.rename(src, dst)
        nombres.add(str(filename.split('_')[1]))
  
# Driver Code 
if __name__ == '__main__': 
      
    # Calling main() function 
    main() 
