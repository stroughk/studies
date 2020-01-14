class Api::V1::StudiesController < ApplicationController
    
    before_action :set_study, only: [:edit, :update, :show, :destroy]

    def index
        @studies = Study.all
        render json: @studies, status: 200
    end

    def show
       render json: @study, status: 200
    end

    def new
        @study = Study.new
    end

    def edit
    end

    def create
        @study = Study.create(study_params)

        if @study.save
            format.html { redirect_to @study, notice: "You successfully created a study log"}
            format.json { render :show, status: created, location: @study }
        else
            format.html { render :new }
            format.json { render json: @study.errors, status: unprocessable_entity}
        end
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

    def set_study
        @study = Study.find(params[:id])
    end
end
