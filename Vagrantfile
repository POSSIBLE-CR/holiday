VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.vm.box = 'ubuntu/precise64'
  config.vm.network    :private_network, ip: '192.168.168.168'
  config.vm.hostname = 'holiday.possible.cr'
  config.vm.provision :file, source: '~/.ssh/id_rsa.pub', destination: '~vagrant/.ssh/authorized_keys2', run: :always
  config.vm.provision :shell, path: "provision.sh"
  config.vm.provision :shell, inline: "service holiday.sh start && service nginx start", run: :always
  config.vm.provider :virtualbox do |v|
    v.memory = `sysctl -n hw.memsize`.to_i / 1024 / 1024 / 3
    v.cpus = `sysctl -n hw.ncpu`.to_i
  end
end
