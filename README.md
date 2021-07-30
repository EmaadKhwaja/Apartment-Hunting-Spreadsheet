# Apartment-Hunting-Spreadsheet

When looking at apartments, there are many different factors at play which can make it difficult to assess the objective value of a rental. Some landlords will offer included utilities, but perhaps at a slight premium, while another cheaper apartment might require you to pay utilities on your own. Furthermore, factoring the cost of commuting can be an extremely important deciding factor. This spreadsheet allows you to organize all of these factors, and uses the Google Maps API to calculate yearly costs and commute times for each unit. 

Here is a preview of what a fully leveraged spreadsheet can look like.

![](Preview.jpg)

## Setup

1. Download this repository. Upload the ```Apartment Hunting Doc.xlsx``` file to Google Drive.
2. Open the excel file as a Google Sheet. On the top bar, select "Script Editor" under "Tools".
3. Copy and paste the contents of ```custom_functions.js```
4. If you'd like to use the commuting calculation function, you're going to [need to set up a directions API key](https://developers.google.com/maps/documentation/javascript/get-api-key). Make sure you set a daily limit on requests so you don't end up being charged everytime you access the sheet.
5. Paste your API key in between the quotes of ```var Your_API_KEY = "";```.

## Usage
