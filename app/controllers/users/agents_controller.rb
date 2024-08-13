# frozen_string_literal: true

module Users
  class AgentsController < ApplicationController
    before_action :set_agent, only: %i[edit update destroy]

    def new
      @agent = current_user.build_agent

      render inertia: 'Admin/Agents/New', props: {
        agent: @agent,
        agentsListPath: admin_agents_path,
        agentPostPath: admin_agents_path
      }
    end

    def create
      @agent = current_user.build_agent(agent_params)
      if @agent.save
        redirect_to admin_users_path, notice: 'API key successfully created.'
      else
        render inertia: 'Admin/Agents/New', props: {
          agent: @agent,
          errors: @agent.errors.full_messages
        }, status: :unprocessable_entity
      end
    end

    def edit
      render inertia: 'Admin/Agents/Edit', props: {
        agent: @agent,
        agentsListPath: admin_agents_path,
        agentPutPath: admin_agent_path(@agent),
        agentDeletePath: admin_agent_path(@agent)
      }
    end

    def update
      if @agent.update(agent_params)
        redirect_to admin_users_path, notice: 'API key successfully updated.'
      else
        render inertia: 'Admin/Agents/Edit', props: {
          agent: @agent,
          errors: @agent.errors.full_messages
        }, status: :unprocessable_entity
      end
    end

    def destroy
      @agent.destroy
      redirect_to admin_agents_path, notice: 'API key successfully deleted.'
    end

    private

    def set_agent
      @agent = current_user.agent
    end

    def agent_params
      params.require(:agent).permit(:api_key)
    end
  end
end
