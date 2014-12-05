holiday
=======

### Commit message syntax

When adding a message to a git commit, the standard syntax is

<pre><code>git commit -m "<JIRA ticket number>::  A comment that describes the fix done."</code></pre>

For example:
<pre><code>git commit -m "HOLIPRO-1:: Adding base files"</code></pre>
Please use an infinitive verb.

### Environment setup

This setup assumes (requires) that you already have an SSH key pair, if you don't know if you already have one, run this:
<pre><code>$ ls -l ~/.ssh | grep id_rsa</code></pre>

You should see something like this:
<code><pre>-rw-------  1 username  group    1766 Feb 27  2014 id_rsa
-rw-------  1 username  group     413 Feb 27  2014 id_rsa.pub<pre></code>

If there's nothing in your terminal output, generate one using the following command:
<pre><code>$ ssh-keygen</code></pre>

And yes, you should set a password for your key pair. After that, you're ready to continue. 

Now clone the latest repository from Git Hub by navigating to the folder where you whant it to be.

For example:

<pre><code>$ cd ~/Desktop/Possible/Work/Holiday</code></pre>

Then use this line to download the files
<pre><code>git clone https://github.com/POSSIBLE-CR/holiday</code></pre>

Run the following commands (they will take time the first time it's run).
<pre><code>$ vagrant box add ubuntu/precise64
$ cd path/to/the-holiday-project
$ vagrant up</code></pre>

Wait until it's done, once it's ready, wait a few seconds and then open in your browser <a href="http://192.168.168.168" target="_blank">the project, that is running on your virtual machine</a>. If see a "502 Bad Gateway" gateway in your browser, just wait for a few more seconds before reloading the project page.

## PAGES

- / : HOME and login
- /createmessage : Submit a message
- /message/:id : this page will show the shared message, where the id param is the ID of the message

## API

- /messages [GET METHOD] : return all the messages
- /messages [POST METHOD] : Create a message
- /messages/:id [GET METHOD] : return the message with the id param
