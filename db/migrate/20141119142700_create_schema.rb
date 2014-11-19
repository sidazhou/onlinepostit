class CreateSchema < ActiveRecord::Migration
  def change
    create_table :boards do |t|
      t.string :url
      t.datetime :created_at
      t.datetime :updated_at
    end

    create_table :posts do |t|
      t.belongs_to :board
      t.text :content
      t.float :x
      t.float :y
      t.float :width
      t.float :height
      t.datetime :created_at
      t.datetime :updated_at
    end

    create_table :stickers do |t|
      # t.belongs_to :board, default: nil
      t.belongs_to :post, default: nil
      t.integer :type
      t.float :x
      t.float :y
      # t.float :width
      # t.float :height
      t.datetime :created_at
      t.datetime :updated_at

    end
  end
end