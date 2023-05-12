module PaginationParams
  def page
    @page ||= params[:page] || 1
  end

  def per
    @per ||= params[:per] || default_per
  end

  def default_per
    20
  end
end
