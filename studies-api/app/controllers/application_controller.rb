class ApplicationController < ActionController::API
    include ExceptionHandler   #deploys custom error pages: 404 and 500+ errors
end
