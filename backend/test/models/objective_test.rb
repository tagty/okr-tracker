require "test_helper"

class ObjectiveTest < ActiveSupport::TestCase
  test "title と period があれば有効" do
    objective = Objective.new(title: "目標", period: "2026 Q1")
    assert objective.valid?
  end

  test "title がなければ無効" do
    objective = Objective.new(period: "2026 Q1")
    assert_not objective.valid?
    assert_includes objective.errors[:title], "can't be blank"
  end

  test "period がなければ無効" do
    objective = Objective.new(title: "目標")
    assert_not objective.valid?
    assert_includes objective.errors[:period], "can't be blank"
  end

  test "description は任意" do
    objective = Objective.new(title: "目標", period: "2026 Q1", description: nil)
    assert objective.valid?
  end
end
