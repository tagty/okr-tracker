class Objective < ApplicationRecord
  validates :title, presence: true
  validates :period, presence: true
end
