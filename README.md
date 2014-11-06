holiday
=======

### Commit message syntax

When adding a message to a git commit, the standard syntax is

<pre><code>
git commit -m "<JIRA ticket number>::  A comment that describes the fix done."
</code></pre>

For example:
<pre><code>
git commit -m "HOLIPRO-1:: Adding base files"
</code></pre>
Please use an infinitive verb.

### Environment setup

<pre><code>
$ vagrant box add ubuntu/precise64
$ cd path/to/the-holiday-project
$ vagrant up
</code></pre>

Wait until it's done, once it's ready, wait a few seconds and then open in your browser <a href="http://192.168.168.168" target="_blank">the project, that is running on your virtual machine</a>. If see a "502 Bad Gateway" gateway in your browser, just wait for a few more seconds before reloading the project page.
