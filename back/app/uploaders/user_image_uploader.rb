class UserImageUploader < CarrierWave::Uploader::Base
  include CarrierWave::MiniMagick
  if Rails.env.test?
    storage :file
  else
    storage :fog
  end

  # 画像の登録がない場合はデフォルトを表示
  def default_url(*_args)
    # デフォルト画像（共通）
    'default.jpg'
    # デフォルト画像（ユーザー）
    # 'default_user_icon.jpg'
  end

  # アップロードファイルの保存先
  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end

  # 画像をリサイズする
  process resize_to_fit: [300, 300]

  # アップロードできるファイルの拡張子を限定する
  def extension_allowlist
    %w[jpg jpeg gif png]
  end

  def url
    return "#{asset_host}/#{store_dir}/#{identifier}?updatedAt=#{model.updated_at.to_i}" if path.present?

    super
  end
end
