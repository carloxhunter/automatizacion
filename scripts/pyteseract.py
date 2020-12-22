import cv2
import pytesseract
import numpy as np
from matplotlib import pyplot as plt
from imutils.perspective import four_point_transform

def increase_brightness(img, value=30):
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
    h, s, v = cv2.split(hsv)

    lim = 255 - value
    v[v > lim] = 255
    v[v <= lim] += value

    final_hsv = cv2.merge((h, s, v))
    img = cv2.cvtColor(final_hsv, cv2.COLOR_HSV2BGR)
    return img

def image_resize(image, width = None, height = None, inter = cv2.INTER_AREA):
    # initialize the dimensions of the image to be resized and
    # grab the image size
    dim = None
    (h, w) = image.shape[:2]

    # if both the width and height are None, then return the
    # original image
    if width is None and height is None:
        return image

    # check to see if the width is None
    if width is None:
        # calculate the ratio of the height and construct the
        # dimensions
        r = height / float(h)
        dim = (int(w * r), height)

    # otherwise, the height is None
    else:
        # calculate the ratio of the width and construct the
        # dimensions
        r = width / float(w)
        dim = (width, int(h * r))

    # resize the image
    resized = cv2.resize(image, dim, interpolation = inter)

    # return the resized image
    return resized

#config='-c tessedit_char_whitelist=0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ --psm 13


#6 anda solido detecta 3 (1 toda wena, 2 con ultimo digio malo)
#7 detecta bien 2 (una toda wena y una con ultimo digitto malo)
#8 detecta 6 bien (2 incorrectas y 4 correctas)
#9 detecta 3 buenas (1 incorrecta 2 correctas)
#10 detecta 6 (2 malas 4 correctas)
#11 detecta 2 (una buena y una mala)
#12 detecta 2 (una buena y una mala)
#13 detecta 6 (2 malas y 4 wenas)

#solidos 8,10,13

psm = 10

psmstr = '--psm '+str(psm)
configs='-c tessedit_char_whitelist=0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ '+psmstr
##configs=psmstr
uno="\YT4584.png" #mala
dos="\BCCV27.png" #buena

path="D:\Descargas\datasets_lpr\datasets_lpr\crops_op_real_2249"
image = cv2.imread(path+dos)
#cv2.imshow(" ",image)
imageres = image_resize(image,400)

alpha = 2.5 # Contrast control (1.0-3.0)
beta = 30 # Brightness control (0-100)

adjusted = cv2.convertScaleAbs(imageres, alpha=alpha, beta=beta)
#adjusted=imageres

#cv2.imshow("mas  contraste", adjusted)



#plus_bright=increase_brightness(imageres,70)
#cv2.imshow("original",imageres)
#cv2.imshow("mas brillo",plus_bright)




#cv2.imshow(" res",imageres)
gray = cv2.cvtColor(adjusted, cv2.COLOR_BGR2GRAY)
#blur = cv2.GaussianBlur(gray, (5,5), 0)
#blurt1 = cv2.GaussianBlur(gray, (5,5), 0)
#blurt2 = cv2.GaussianBlur(gray, (3,5), 0)
blurt3 = cv2.GaussianBlur(gray, (9,9), 0)

#cv2.imshow("1", blurt1)
#cv2.imshow("2", blurt2)
#cv2.imshow("3", blurt3)

#thresinit = cv2.threshold(blurt3, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)[1]

filter = np.array([[-1, -1, -1], [-1, 9, -1], [-1, -1, -1]])
sharpen_img_1=cv2.filter2D(blurt3,-1,filter)
#cv2.imshow("sharp", sharpen_img_1)
#cv2.imshow("sharp2", sharpen2_img_1)
thresinit = cv2.threshold(sharpen_img_1, 0, 255,  cv2.THRESH_BINARY + cv2.THRESH_OTSU)[1]
#sharpen2_img_1=cv2.filter2D(sharpen_img_1,-1,filter)
#sharpen2_img_1=cv2.filter2D(sharpen_img_1,-1,filter)
#cv2.imshow("sharp", sharpen_img_1)
#thresinit2 = cv2.threshold(sharpen_img_1, 0, 255,   cv2.THRESH_OTSU)[1]
#thresinit1 = cv2.threshold(sharpen_img_1, 0, 255,  cv2.THRESH_BINARY)[1]
#cv2.imshow("th", thresinit)
#cv2.imshow("th1", thresinit1)
#cv2.imshow("th2", thresinit2)
cnts = cv2.findContours(thresinit, cv2.RETR_EXTERNAL,cv2.CHAIN_APPROX_SIMPLE)
#cv2.imshow("cnts", cnts)
cnts = cnts[0] if len(cnts) == 2 else cnts[1]
cnts = sorted(cnts, key=cv2.contourArea, reverse=True)
displayCnt = None

for c in cnts:
    # Perform contour approximation
    peri = cv2.arcLength(c, True)
    approx = cv2.approxPolyDP(c, 0.02 * peri, True)
    if len(approx) == 4:
        displayCnt = approx
        break
#warped = four_point_transform(imageres, displayCnt.reshape(4, 2))
#cv2.imshow("blurjiro",blur)
#cv2.imshow("thresh", threshjiro)
#cv2.imshow("warped", warped)
#cv2.imshow("image", imageres)
#cv2.imwrite("thresh.png", threshjiro)
#cv2.imwrite("warped.png", warped)
#cv2.imwrite("image.png", image)

#pytesseract.pytesseract.tesseract_cmd = r'D:\conda\envs\ffmpeg\Scripts\tesseract.exe'
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR/tesseract.exe'
# cargar la imagen utilizando opencv

warped= sharpen_img_1
row, col = warped.shape[:2]
bottom = warped[row-2:row, 0:col]
mean = cv2.mean(bottom)[0]
ih, iw = warped.shape[0], warped.shape[1]
bor1, bor2 = 5, 5 #arriba abajo , lados
crop_img = warped[bor1:ih-bor1, bor2:iw-bor2]

bordersize = 5
output_border = cv2.copyMakeBorder(
    crop_img,
    top=bordersize,
    bottom=bordersize,
    left=bordersize,
    right=bordersize,
    borderType=cv2.BORDER_CONSTANT,
    value=[255,255,255]
)

#cv2.imshow("border",output_border)
imgr = output_border


gray = imgr
#gray = cv2.cvtColor(imgr, cv2.COLOR_BGR2GRAY)
# extraer texto de la imagen
sret=pytesseract.image_to_string(imageres, config=configs)
sret2=pytesseract.image_to_string(gray, config=configs)


blur2 = cv2.GaussianBlur(gray, (5,5), 0)
ret,thresh1 = cv2.threshold(blur2,127,255,cv2.THRESH_BINARY)
ret,thresh2 = cv2.threshold(blur2,127,255,cv2.THRESH_BINARY_INV)
ret,thresh3 = cv2.threshold(blur2,127,255,cv2.THRESH_TRUNC)
ret,thresh4 = cv2.threshold(blur2,127,255,cv2.THRESH_TOZERO)
ret,thresh5 = cv2.threshold(blur2, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)




sretr1=pytesseract.image_to_string(thresh1, config=configs)
sretr2=pytesseract.image_to_string(thresh2, config=configs)
sretr3=pytesseract.image_to_string(thresh3, config=configs)
sretr4=pytesseract.image_to_string(thresh4, config=configs)
sretr5=pytesseract.image_to_string(thresh5, config=configs)

sretrinit=pytesseract.image_to_string(thresinit, config=configs)
cannyimg = cv2.Canny(imgr,100,200)
cannygray = cv2.Canny(gray,100,200)
cannythresh = cv2.Canny(thresh3,100,200)

sretcan1=pytesseract.image_to_string(cannyimg, config=configs)
sretcan2=pytesseract.image_to_string(cannygray, config=configs)
sretcan3=pytesseract.image_to_string(cannythresh, config=configs)

images = [imageres, gray, thresh1, thresh2, thresh3, thresh4, thresh5,cannyimg,cannygray,cannythresh]


titles = [sret[:-2]+" original", sret2[:-2]+" grayscale", sretr1[:-2]+" tresh1",
sretr2[:-2]+" tresh2",sretr3[:-2]+" tresh3",sretr4[:-2]+" tresh4",sretr5[:-2]+" tresh5",sretcan1[:-2]+"canny1",
sretcan2[:-2]+"canny gray",sretcan3[:-2]+" canny tresh"]


for i in range(10):
    plt.subplot(2,5,i+1),plt.imshow(images[i],'gray',vmin=0,vmax=255)
    plt.title(titles[i])
    plt.xticks([]),plt.yticks([])
plt.show()


cv2.waitKey(0)






