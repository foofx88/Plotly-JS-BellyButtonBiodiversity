<img src="/snips/bacteria.jpg" alt="bacteria" width="150" height="150" align="right">

Using the Belly Button dataset provided in samples.json, the data is presented to the HTML file via Javascript using D3.json() <br>
The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.

<hr>

The following is a preview of the codes for the bubble chart:

<img src="/snips/samplecode1.JPG" alt="main dashboard" width="634" height="543">

Once all the functions are coded, buildCharts (Contains the Bar and Bubble Chart), buildSubjectData (Display Information for each Test Subject) and buildGaugeChart are completed, the initialisation for the dashboard combines them. The firstSample displays the default display on the dashboard. In this case we are showing the 1st Test Subject in the dataset provided. The optionChanged would grab the newly selected value and input into the 3 main functions. <br>
<img src="/snips/samplecode2.JPG" alt="main dashboard" width="748" height="510">

Once the dataset is appended onto the drop down, users can select the Test Subject ID they want to view and the dashboard will dynamically updates according to the Test Subject ID selected. 
<img src="/snips/dashboard.png" alt="main dashboard" width="748" height="436">

<img src="/snips/bubblechart.png" alt="bubble chart" width="748" height="304">

The Dashboard display when another Test Subject ID was selected.
<img src="/snips/dashboard2.png" alt="new data dashboard" width="748" height="560">

