# import libraries
import urllib2
import sys
from bs4 import BeautifulSoup

username = sys.argv[1]
url = 'https://fbid.co/?url=https%3A%2F%2Fwww.facebook.com%2F'+username
page = urllib2.urlopen(url)
soup = BeautifulSoup(page, 'html.parser')
element = soup.find('div', attrs={'class':'alert alert-success'})
message = element.text
fbid = message[23:]
print(fbid)

