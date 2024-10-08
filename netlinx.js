module.exports = {
    __netlinx__: /__netlinx__/i,

    /**
     * Constants
     */
    netlinx_axi_version: /netlinx_axi_version/i,
    url_flg_tcp: /url_flg_tcp/i,
    url_flg_accinfopresent: /url_flg_accinfopresent/i,
    url_flg_temp: /url_flg_temp/i,
    url_flg_stat_prgnetlinx: /url_flg_stat_prgnetlinx/i,
    url_flg_stat_mask: /url_flg_stat_mask/i,
    url_flg_stat_lookup: /url_flg_stat_lookup/i,
    url_flg_stat_connecting: /url_flg_stat_connecting/i,
    url_flg_stat_waiting: /url_flg_stat_waiting/i,
    url_flg_stat_connected: /url_flg_stat_connected/i,
    ip_addr_flg_dhcp: /ip_addr_flg_dhcp/i,
    first_virtual_device: /first_virtual_device/i,
    first_local_port: /first_local_port/i,
    dynamic_virtual_device: /dynamic_virtual_device/i,
    timeline_once: /timeline_once/i,
    timeline_repeat: /timeline_repeat/i,
    timeline_absolute: /timeline_absolute/i,
    timeline_relative: /timeline_relative/i,
    do_push_timed_infinite: /do_push_timed_infinite/i,
    source_type_no_address: /source_type_no_address/i,
    source_type_neuron_id: /source_type_neuron_id/i,
    source_type_ip_address: /source_type_ip_address/i,
    source_type_axlink: /source_type_axlink/i,
    source_type_neuron_subnode_icsp: /source_type_neuron_subnode_icsp/i,
    source_type_neuron_subnode_pl: /source_type_neuron_subnode_pl/i,
    source_type_ip_socket_address: /source_type_ip_socket_address/i,
    source_type_rs232: /source_type_rs232/i,
    source_type_internal: /source_type_internal/i,
    source_type_mac_address: /source_type_mac_address/i,
    source_type_ipv4_port: /source_type_ipv4_port/i,
    source_type_ipv4_port_mac_address: /source_type_ipv4_port_mac_address/i,
    source_type_ipv4_port_mac_ipv6: /source_type_ipv4_port_mac_ipv6/i,
    internal_queue_size_index_interpreter:
        /internal_queue_size_index_interpreter/i,
    internal_queue_size_index_notification_mgr:
        /internal_queue_size_index_notification_mgr/i,
    internal_queue_size_index_connection_mgr:
        /internal_queue_size_index_connection_mgr/i,
    internal_queue_size_index_route_mgr: /internal_queue_size_index_route_mgr/i,
    internal_queue_size_index_device_mgr:
        /internal_queue_size_index_device_mgr/i,
    internal_queue_size_index_diagnostic_mgr:
        /internal_queue_size_index_diagnostic_mgr/i,
    internal_queue_size_index_tcp_tx: /internal_queue_size_index_tcp_tx/i,
    internal_queue_size_index_ipconnection_mgr:
        /internal_queue_size_index_ipconnection_mgr/i,
    internal_queue_size_index_message_dispatcher:
        /internal_queue_size_index_message_dispatcher/i,
    internal_queue_size_index_axlink_tx: /internal_queue_size_index_axlink_tx/i,
    internal_queue_size_index_phastlink_tx:
        /internal_queue_size_index_phastlink_tx/i,
    internal_queue_size_index_icsplontalk_tx:
        /internal_queue_size_index_icsplontalk_tx/i,
    internal_queue_size_index_icsp232_tx:
        /internal_queue_size_index_icsp232_tx/i,
    internal_queue_size_index_icspip_tx: /internal_queue_size_index_icspip_tx/i,
    internal_queue_size_index_ni_device: /internal_queue_size_index_ni_device/i,
    true: /true/i,
    false: /false/i,
    file_read_only: /file_read_only/i,
    file_rw_new: /file_rw_new/i,
    file_rw_append: /file_rw_append/i,
    ip_tcp: /ip_tcp/i,
    ip_udp: /ip_udp/i,
    ip_udp_2way: /ip_udp_2way/i,
    xml_encode_types: /xml_encode_types/i,
    xml_encode_char_as_list: /xml_encode_char_as_list/i,
    xml_encode_le: /xml_encode_le/i,
    xml_decode_types: /xml_decode_types/i,
    xml_decode_no_preserve: /xml_decode_no_preserve/i,
    duet_dev_type_display_device: /duet_dev_type_display_device/i,
    duet_dev_type_rfidsystem_device: /duet_dev_type_rfidsystem_device/i,
    duet_dev_type_lightsystem_device: /duet_dev_type_lightsystem_device/i,
    duet_dev_type_io_device: /duet_dev_type_io_device/i,
    duet_dev_type_relay_device: /duet_dev_type_relay_device/i,
    duet_dev_type_ups: /duet_dev_type_ups/i,
    duet_dev_type_amplifier: /duet_dev_type_amplifier/i,
    duet_dev_type_audio_conferencer: /duet_dev_type_audio_conferencer/i,
    duet_dev_type_audio_mixer: /duet_dev_type_audio_mixer/i,
    duet_dev_type_audio_processor: /duet_dev_type_audio_processor/i,
    duet_dev_type_audio_tuner_device: /duet_dev_type_audio_tuner_device/i,
    duet_dev_type_camera: /duet_dev_type_camera/i,
    duet_dev_type_digital_media_encoder: /duet_dev_type_digital_media_encoder/i,
    duet_dev_type_digital_media_decoder: /duet_dev_type_digital_media_decoder/i,
    duet_dev_type_digital_media_server: /duet_dev_type_digital_media_server/i,
    duet_dev_type_dss: /duet_dev_type_dss/i,
    duet_dev_type_dvr: /duet_dev_type_dvr/i,
    duet_dev_type_disc_device: /duet_dev_type_disc_device/i,
    duet_dev_type_document_camera: /duet_dev_type_document_camera/i,
    duet_dev_type_audio_tape: /duet_dev_type_audio_tape/i,
    duet_dev_type_hvac: /duet_dev_type_hvac/i,
    duet_dev_type_keypad: /duet_dev_type_keypad/i,
    duet_dev_type_light: /duet_dev_type_light/i,
    duet_dev_type_monitor: /duet_dev_type_monitor/i,
    duet_dev_type_motor: /duet_dev_type_motor/i,
    duet_dev_type_multi_window: /duet_dev_type_multi_window/i,
    duet_dev_type_pool_spa: /duet_dev_type_pool_spa/i,
    duet_dev_type_preamp_surround_sound_processor:
        /duet_dev_type_preamp_surround_sound_processor/i,
    duet_dev_type_receiver: /duet_dev_type_receiver/i,
    duet_dev_type_security_system: /duet_dev_type_security_system/i,
    duet_dev_type_sensor_device: /duet_dev_type_sensor_device/i,
    duet_dev_type_settop_box: /duet_dev_type_settop_box/i,
    duet_dev_type_slide_projector: /duet_dev_type_slide_projector/i,
    duet_dev_type_switcher: /duet_dev_type_switcher/i,
    duet_dev_type_text_keypad: /duet_dev_type_text_keypad/i,
    duet_dev_type_tv: /duet_dev_type_tv/i,
    duet_dev_type_utility: /duet_dev_type_utility/i,
    duet_dev_type_vcr: /duet_dev_type_vcr/i,
    duet_dev_type_video_conferencer: /duet_dev_type_video_conferencer/i,
    duet_dev_type_video_processor: /duet_dev_type_video_processor/i,
    duet_dev_type_video_projector: /duet_dev_type_video_projector/i,
    duet_dev_type_video_wall: /duet_dev_type_video_wall/i,
    duet_dev_type_volume_controller: /duet_dev_type_volume_controller/i,
    duet_dev_type_weather: /duet_dev_type_weather/i,
    duet_dev_not_polled: /duet_dev_not_polled/i,
    duet_dev_polled: /duet_dev_polled/i,
    clkmgr_mode_network: /clkmgr_mode_network/i,
    clkmgr_mode_standalone: /clkmgr_mode_standalone/i,
    normal_standby: /normal_standby/i,
    normal_wake: /normal_wake/i,
    ip_multicast_ttl_option: /ip_multicast_ttl_option/i,
    ip_ttl_subnet: /ip_ttl_subnet/i,
    ip_ttl_site: /ip_ttl_site/i,
    ip_ttl_region: /ip_ttl_region/i,
    ip_ttl_continent: /ip_ttl_continent/i,
    ip_tcp_nodelay_option: /ip_tcp_nodelay_option/i,
    ip_nodelay_on: /ip_nodelay_on/i,
    ip_nodelay_off: /ip_nodelay_off/i,
    amx_error: /amx_error/i,
    amx_warning: /amx_warning/i,
    amx_info: /amx_info/i,
    amx_debug: /amx_debug/i,
    netlinx_login_success: /netlinx_login_success/i,
    netlinx_login_fail: /netlinx_login_fail/i,
    netlinx_logout: /netlinx_logout/i,
    null_str: /null_str/i,
    smtp_address: /smtp_address/i,
    smtp_port_number: /smtp_port_number/i,
    smtp_username: /smtp_username/i,
    smtp_password: /smtp_password/i,
    smtp_require_tls: /smtp_require_tls/i,
    smtp_from: /smtp_from/i,
    smtp_tls_true: /smtp_tls_true/i,
    smtp_tls_false: /smtp_tls_false/i,
    listview_on_row_select_event: /listview_on_row_select_event/i,
    data_structure_unknown: /data_structure_unknown/i,
    data_structure_datafeed: /data_structure_datafeed/i,
    data_structure_datarecordset: /data_structure_datarecordset/i,
    data_structure_datarecord: /data_structure_datarecord/i,
    data_structure_datafield: /data_structure_datafield/i,
    data_max_content_field_count: /data_max_content_field_count/i,
    data_max_metadata_field_count: /data_max_metadata_field_count/i,
    data_max_id_length: /data_max_id_length/i,
    data_max_name_length: /data_max_name_length/i,
    data_max_description_length: /data_max_description_length/i,
    data_max_type_length: /data_max_type_length/i,
    data_max_format_length: /data_max_format_length/i,
    data_max_source_length: /data_max_source_length/i,
    data_max_value_length: /data_max_value_length/i,
    data_max_label_length: /data_max_label_length/i,
    data_max_url_length: /data_max_url_length/i,
    max_last_login_info_length: /max_last_login_info_length/i,
    data_type_unknown: /data_type_unknown/i,
    data_type_string: /data_type_string/i,
    data_type_datetime: /data_type_datetime/i,
    data_type_date: /data_type_date/i,
    data_type_time: /data_type_time/i,
    data_type_image: /data_type_image/i,
    data_format_url: /data_format_url/i,
    data_format_phone: /data_format_phone/i,
    data_format_email: /data_format_email/i,
    data_format_iso8601: /data_format_iso8601/i,
    auditlog_priv: /auditlog_priv/i,
    configuration_priv: /configuration_priv/i,
    deviceconfig_priv: /deviceconfig_priv/i,
    ftp_priv: /ftp_priv/i,
    http_priv: /http_priv/i,
    networkconfig_priv: /networkconfig_priv/i,
    programport_priv: /programport_priv/i,
    remoteui_priv: /remoteui_priv/i,
    securitycontrol_priv: /securitycontrol_priv/i,
    softwaremanagement_priv: /softwaremanagement_priv/i,
    terminal_priv: /terminal_priv/i,
    tpadmin_priv: /tpadmin_priv/i,
    user1_priv: /user1_priv/i,
    user2_priv: /user2_priv/i,
    user3_priv: /user3_priv/i,
    user4_priv: /user4_priv/i,
    usermanagement_priv: /usermanagement_priv/i,
    valid_account: /valid_account/i,
    err_name_invalid: /err_name_invalid/i,
    err_password_invalid: /err_password_invalid/i,
    err_invalid_account: /err_invalid_account/i,
    err_no_authorization: /err_no_authorization/i,
    err_invalid_parameter: /err_invalid_parameter/i,
    err_user_locked_out: /err_user_locked_out/i,
    err_user_account_expired: /err_user_account_expired/i,
    err_general_error: /err_general_error/i,
    err_authentication_error: /err_authentication_error/i,
    tls_ignore_certificate_errors: /tls_ignore_certificate_errors/i,
    tls_validate_certificate: /tls_validate_certificate/i,

    /**
     * Structered Types
     */
    tdata: /tdata/i,
    tchannel: /tchannel/i,
    tlevel: /tlevel/i,
    tbutton: /tbutton/i,
    ttimeline: /ttimeline/i,
    tcustom: /tcustom/i,
    url_struct: /url_struct/i,
    dns_struct: /dns_struct/i,
    ip_address_struct: /ip_address_struct/i,
    dev_info_struct: /dev_info_struct/i,
    clkmgr_timeserver_struct: /clkmgr_timeserver_struct/i,
    data_feed: /data_feed/i,
    data_field: /data_field/i,
    data_record: /data_record/i,
    wc_data_feed: /wc_data_feed/i,
    wc_data_field: /wc_data_field/i,
    wc_data_record: /wc_data_record/i,
    last_login_info: /last_login_info/i,

    /**
     * System Variables
     */
    ___reserved___: /___reserved___/i,
    push_device: /push_device/i,
    push_channel: /push_channel/i,
    push_devchan: /push_devchan/i,
    release_device: /release_device/i,
    release_channel: /release_channel/i,
    release_devchan: /release_devchan/i,
    master_slot: /master_slot/i,
    get_pulse_time: /get_pulse_time/i,
    get_timer: /get_timer/i,
    day: /day/i,
    date: /date/i,
    time: /time/i,
    master_sn: /master_sn/i,
    system_number: /system_number/i,
    ldate: /ldate/i,
    button: /button/i,
    dv_channel: /dv_channel/i,
    data: /data/i,
    level: /level/i,
    timeline: /timeline/i,
    channel: /channel/i,
    custom: /custom/i,

    /**
     * Library Functions
     */
    atoi: /atoi/i,
    atol: /atol/i,
    atof: /atof/i,
    date_to_day: /date_to_day/i,
    date_to_month: /date_to_month/i,
    date_to_year: /date_to_year/i,
    day_of_week: /day_of_week/i,
    file_close: /file_close/i,
    file_copy: /file_copy/i,
    file_create_dir: /file_create_dir/i,
    file_delete: /file_delete/i,
    file_dir: /file_dir/i,
    file_getdir: /file_getdir/i,
    file_open: /file_open/i,
    file_read: /file_read/i,
    file_read_line: /file_read_line/i,
    file_remove_dir: /file_remove_dir/i,
    file_rename: /file_rename/i,
    file_seek: /file_seek/i,
    file_setdir: /file_setdir/i,
    file_write: /file_write/i,
    file_write_line: /file_write_line/i,
    find_string: /find_string/i,
    ftoa: /ftoa/i,
    get_last: /get_last/i,
    hextoi: /hextoi/i,
    ip_client_close: /ip_client_close/i,
    ip_client_open: /ip_client_open/i,
    ip_server_close: /ip_server_close/i,
    ip_server_open: /ip_server_open/i,
    itoa: /itoa/i,
    itohex: /itohex/i,
    left_string: /left_string/i,
    length_array: /length_array/i,
    length_string: /length_string/i,
    load_duet_module: /load_duet_module/i,
    lower_string: /lower_string/i,
    max_length_array: /max_length_array/i,
    max_length_string: /max_length_string/i,
    mid_string: /mid_string/i,
    random_number: /random_number/i,
    remove_string: /remove_string/i,
    right_string: /right_string/i,
    set_length_array: /set_length_array/i,
    set_length_string: /set_length_string/i,
    time_to_hour: /time_to_hour/i,
    time_to_minute: /time_to_minute/i,
    time_to_second: /time_to_second/i,
    unload_duet_module: /unload_duet_module/i,
    upper_string: /upper_string/i,

    compare_string: /compare_string/i,
    ip_mc_server_open: /ip_mc_server_open/i,
    format: /format/i,
    timeline_create: /timeline_create/i,
    timeline_kill: /timeline_kill/i,
    timeline_reload: /timeline_reload/i,
    timeline_pause: /timeline_pause/i,
    timeline_restart: /timeline_restart/i,
    timeline_set: /timeline_set/i,
    timeline_get: /timeline_get/i,
    timeline_active: /timeline_active/i,
    timeline_dynamic_id: /timeline_dynamic_id/i,
    get_buffer_char: /get_buffer_char/i,
    get_multi_buffer_string: /get_multi_buffer_string/i,
    get_buffer_string: /get_buffer_string/i,
    device_id: /device_id/i,
    device_id_string: /device_id_string/i,
    device_info: /device_info/i,
    do_push: /do_push/i,
    do_release: /do_release/i,
    redirect_string: /redirect_string/i,
    set_pulse_time: /set_pulse_time/i,
    set_timer: /set_timer/i,
    variable_to_string: /variable_to_string/i,
    string_to_variable: /string_to_variable/i,
    length_variable_to_string: /length_variable_to_string/i,
    dynamic_application_device: /dynamic_application_device/i,
    dynamic_polled_port: /dynamic_polled_port/i,
    get_unique_id: /get_unique_id/i,
    get_serial_number: /get_serial_number/i,
    get_system_number: /get_system_number/i,
    set_system_number: /set_system_number/i,
    get_dns_list: /get_dns_list/i,
    set_dns_list: /set_dns_list/i,
    get_ip_address: /get_ip_address/i,
    set_ip_address: /set_ip_address/i,
    set_validation_code: /set_validation_code/i,
    get_url_list: /get_url_list/i,
    add_url_entry: /add_url_entry/i,
    delete_url_entry: /delete_url_entry/i,
    reboot: /reboot/i,
    do_push_timed: /do_push_timed/i,
    set_outdoor_temperature: /set_outdoor_temperature/i,
    set_virtual_level_count: /set_virtual_level_count/i,
    set_virtual_channel_count: /set_virtual_channel_count/i,
    set_virtual_port_count: /set_virtual_port_count/i,
    type_cast: /type_cast/i,
    raw_be: /raw_be/i,
    raw_le: /raw_le/i,
    astro_clock: /astro_clock/i,
    abs_value: /abs_value/i,
    max_value: /max_value/i,
    min_value: /min_value/i,
    variable_to_xml: /variable_to_xml/i,
    xml_to_variable: /xml_to_variable/i,
    length_variable_to_xml: /length_variable_to_xml/i,
    static_port_binding: /static_port_binding/i,
    static_ip_binding: /static_ip_binding/i,
    internal_queue_size_set: /internal_queue_size_set/i,
    internal_queue_size_get: /internal_queue_size_get/i,
    internal_threshold_set: /internal_threshold_set/i,
    internal_threshold_get: /internal_threshold_get/i,
    rebuilt_event: /rebuilt_event/i,
    do_custom_event: /do_custom_event/i,
    duet_mem_size_set: /duet_mem_size_set/i,
    duet_mem_size_get: /duet_mem_size_get/i,
    clkmgr_is_network_sourced: /clkmgr_is_network_sourced/i,
    clkmgr_set_clk_source: /clkmgr_set_clk_source/i,
    clkmgr_is_daylightsavings_on: /clkmgr_is_daylightsavings_on/i,
    clkmgr_set_daylightsavings_mode: /clkmgr_set_daylightsavings_mode/i,
    clkmgr_get_timezone: /clkmgr_get_timezone/i,
    clkmgr_set_timezone: /clkmgr_set_timezone/i,
    clkmgr_get_resync_period: /clkmgr_get_resync_period/i,
    clkmgr_set_resync_period: /clkmgr_set_resync_period/i,
    clkmgr_get_daylightsavings_offset: /clkmgr_get_daylightsavings_offset/i,
    clkmgr_set_daylightsavings_offset: /clkmgr_set_daylightsavings_offset/i,
    clkmgr_get_active_timeserver: /clkmgr_get_active_timeserver/i,
    clkmgr_set_active_timeserver: /clkmgr_set_active_timeserver/i,
    clkmgr_get_timeservers: /clkmgr_get_timeservers/i,
    clkmgr_add_userdefined_timeserver: /clkmgr_add_userdefined_timeserver/i,
    clkmgr_delete_userdefined_timeserver:
        /clkmgr_delete_userdefined_timeserver/i,
    clkmgr_get_start_daylightsavings_rule:
        /clkmgr_get_start_daylightsavings_rule/i,
    clkmgr_set_start_daylightsavings_rule:
        /clkmgr_set_start_daylightsavings_rule/i,
    clkmgr_get_end_daylightsavings_rule: /clkmgr_get_end_daylightsavings_rule/i,
    clkmgr_set_end_daylightsavings_rule: /clkmgr_set_end_daylightsavings_rule/i,
    device_standby: /device_standby/i,
    device_wake: /device_wake/i,
    ip_set_option: /ip_set_option/i,
    ip_bound_client_open: /ip_bound_client_open/i,
    set_log_level: /set_log_level/i,
    get_log_level: /get_log_level/i,
    amx_log: /amx_log/i,
    smtp_server_config_set: /smtp_server_config_set/i,
    smtp_server_config_get: /smtp_server_config_get/i,
    smtp_send: /smtp_send/i,
    exp_value: /exp_value/i,
    log_value: /log_value/i,
    log10_value: /log10_value/i,
    power_value: /power_value/i,
    sqrt_value: /sqrt_value/i,
    validate_netlinx_account: /validate_netlinx_account/i,
    audit_netlinx_session_event: /audit_netlinx_session_event/i,
    audit_netlinx_generic_event: /audit_netlinx_generic_event/i,
    get_available_flash_disk_space: /get_available_flash_disk_space/i,
    get_max_flash_disk_space: /get_max_flash_disk_space/i,
    data_create_feed: /data_create_feed/i,
    data_delete_feed: /data_delete_feed/i,
    data_publish_feed: /data_publish_feed/i,
    data_get_published_feed: /data_get_published_feed/i,
    data_add_record: /data_add_record/i,
    data_get_event_record: /data_get_event_record/i,
    _wc_data_create_feed: /_wc_data_create_feed/i,
    _wc_data_add_record: /_wc_data_add_record/i,
    _wc_data_get_event_record: /_wc_data_get_event_record/i,
    validate_netlinx_account_with_permission:
        /validate_netlinx_account_with_permission/i,
    authenticate_certificate: /authenticate_certificate/i,
    ssh_client_close: /ssh_client_close/i,
    ssh_client_open: /ssh_client_open/i,
    tls_client_close: /tls_client_close/i,
    tls_client_open: /tls_client_open/i,

    /**
     * Unimplemented Functions
     */
    _wc_encode_int: /_wc_encode_int/i,
    _wc_decode_int: /_wc_decode_int/i,
    _wc_int: /_wc_int/i,
    _wc_to_ch_int: /_wc_to_ch_int/i,
    _ch_to_wc_int: /_ch_to_wc_int/i,
    _wc_find_string_int: /_wc_find_string_int/i,
    _wc_left_string_int: /_wc_left_string_int/i,
    _wc_lower_string_int: /_wc_lower_string_int/i,
    _wc_mid_string_int: /_wc_mid_string_int/i,
    _wc_remove_string_int: /_wc_remove_string_int/i,
    _wc_right_string_int: /_wc_right_string_int/i,
    _wc_upper_string_int: /_wc_upper_string_int/i,
    _wc_compare_string_int: /_wc_compare_string_int/i,
    _wc_get_buffer_char_int: /_wc_get_buffer_char_int/i,
    _wc_get_buffer_string_int: /_wc_get_buffer_string_int/i,
    _wc_concat_string_int: /_wc_concat_string_int/i,
    _wc_file_open_int: /_wc_file_open_int/i,
    _wc_file_close_int: /_wc_file_close_int/i,
    _wc_file_read_int: /_wc_file_read_int/i,
    _wc_file_read_line_int: /_wc_file_read_line_int/i,
    _wc_file_write_int: /_wc_file_write_int/i,
    _wc_file_write_line_int: /_wc_file_write_line_int/i,

    /**
     * Get Master Build
     */
    get_master_build: /get_master_build/i,
};
