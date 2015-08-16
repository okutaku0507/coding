module ApplicationHelper
  include HtmlBuilder
  def page_title
    title = "Coding"
    title = @title + " - " + title if @title
    title
  end

  # 改行文字 => BR
  def hbr(target)
    target = html_escape(target)
    target.gsub(/\r\n|\r|\n/, "<br />").html_safe
  end

  # flash
  def flash_messages
    markup do |m|
      if flash[:alert].present? || flash[:notice].present?
        m.div(class: 'col-xs-12') do
          m.div(flash[:alert], class: 'alert alert-danger', role: 'alert') if flash[:alert].present?
          m.div(flash[:notice], class: 'alert alert-info', role: 'alert') if flash[:notice].present?
        end
      end
    end
  end
end
