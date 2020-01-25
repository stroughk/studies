class Api::V1::StudiesController < ApplicationController   #namespace it in case there is a version 2
    
    before_action :set_study, only: [:edit, :update, :show, :destroy]

    def index
        @studies = Study.all
        render json: @studies, status: 200
    end

    def show
        render json: @study, status: 200
    end

    def editMO
    end

    def create
        @study = Study.create!(study_params)   #needs validation .. if @study.save?
        objective_params.each do |objective|
            puts objective
            @study.objectives.create!(title:objective, done:false)
        end
        render json: @study, status: 200
 
    end

    def update
        @study.update(study_params)
        render json: @study, status: 200
    end

    def destroy
        @study.delete

        render json: {studyId: @study.id}
    end
    
    private
    
    def study_params
        params.require(:study).permit(:programming_language, :topic, :description)
    end

    def objective_params
        params[:objectives]
    end

    def set_study
        @study = Study.find(params[:id])
    end
end
