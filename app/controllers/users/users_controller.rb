# frozen_string_literal: true

module Users
  class UsersController < ApplicationController
    before_action :set_user, only: %i[edit update]
    # TODO: implement authorization

    def index
      users = User.select(:id, :username, :email).all

      render inertia: 'Admin/Users/List', props: {
        users:,
        newPath: new_admin_user_path,
        editPath: edit_admin_user_path(0)
      }
    end

    def new
      user = User.new

      render inertia: 'Admin/Users/New', props: {
        user:,
        usersListPath: admin_users_path,
        userPostPath: admin_users_path
      }
    end

    def edit
      @user.build_agent unless @user.agent
      render inertia: 'Admin/Users/Edit', props: {
        user: @user.as_json(include: :agent),
        usersListPath: admin_users_path,
        userPutPath: admin_user_path(@user),
        userDeletePath: admin_user_path(@user)
      }
    end

    def update
      @user.build_agent unless @user.agent

      if @user.update(user_params)
        @user.agent.api_key = params['agent']['api_key']
        @user.save!
        redirect_to edit_admin_user_path(@user), notice: t('users.update.success')
      else
        render inertia: 'Admin/Users/Edit', props: {
          user: @user.as_json(include: :agent),
          errors: @user.errors.full_messages
        }, status: :unprocessable_entity
      end
    end

    def create
      user = User.new(user_params)
      if user.save
        redirect_to(admin_users_path, notice: t('users.create.success'))
      else
        redirect_to(new_admin_user_path, alert: t('users.create.error'), inertia: { errors: user.errors })
      end
    end

    def destroy
      user = User.find(params[:id])

      user.destroy

      redirect_to(admin_users_path, notice: t('users.destroy.success'))
    end

    private

    def set_user
      @user = User.find(params[:id])
    end

    def user_params
      params.require(:user).permit(:username, :email, :password, :password_confirmation, agent_attributes: [:id, :api_key])
    end
  end
end
