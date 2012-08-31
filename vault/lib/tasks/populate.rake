namespace :db do
  desc "Populates shit"
  task :populate => :environment do
    Rake::Task['db:reset'].invoke

    Provider.create(name: "facebook", logo_url: '/logos/facebook_32.png')
    Provider.create(name: "twitter", logo_url: '/logos/twitter_32.png')
  end
end
