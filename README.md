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
$ cd path/to/project
$ chmod a+rx provision.sh
$ vagrant up
</code></pre>
... wait until it finishes ... then go to <a href="http://192.168.168.168">the project, running on your virtual machine</a>, you can also access it goint to <a href="http://192.168.168.168:3000">http://192.168.168.168:3000</a>.
