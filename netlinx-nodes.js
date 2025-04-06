/**
 * @file NetLinx node definitions for tree-sitter
 * @license MIT
 */

const netlinx = require("./netlinx");

/**
 * Creates netlinx node rules
 *
 * @returns {object} NetLinx node rules
 */
module.exports = {
    constants: {
        __netlinx__: (_) => netlinx.constants.__netlinx__,
        netlinx_axi_version: (_) => netlinx.constants.netlinx_axi_version,
        url_flg_tcp: (_) => netlinx.constants.url_flg_tcp,
        url_flg_accinfopresent: (_) => netlinx.constants.url_flg_accinfopresent,
        url_flg_temp: (_) => netlinx.constants.url_flg_temp,
        url_flg_stat_prgnetlinx: (_) =>
            netlinx.constants.url_flg_stat_prgnetlinx,
        url_flg_stat_mask: (_) => netlinx.constants.url_flg_stat_mask,
        url_flg_stat_lookup: (_) => netlinx.constants.url_flg_stat_lookup,
        url_flg_stat_connecting: (_) =>
            netlinx.constants.url_flg_stat_connecting,
        url_flg_stat_waiting: (_) => netlinx.constants.url_flg_stat_waiting,
        url_flg_stat_connected: (_) => netlinx.constants.url_flg_stat_connected,
        ip_addr_flg_dhcp: (_) => netlinx.constants.ip_addr_flg_dhcp,
        first_virtual_device: (_) => netlinx.constants.first_virtual_device,
        first_local_port: (_) => netlinx.constants.first_local_port,
        dynamic_virtual_device: (_) => netlinx.constants.dynamic_virtual_device,
        timeline_once: (_) => netlinx.constants.timeline_once,
        timeline_repeat: (_) => netlinx.constants.timeline_repeat,
        timeline_absolute: (_) => netlinx.constants.timeline_absolute,
        timeline_relative: (_) => netlinx.constants.timeline_relative,
        do_push_timed_infinite: (_) => netlinx.constants.do_push_timed_infinite,
        source_type_no_address: (_) => netlinx.constants.source_type_no_address,
        source_type_neuron_id: (_) => netlinx.constants.source_type_neuron_id,
        source_type_ip_address: (_) => netlinx.constants.source_type_ip_address,
        source_type_axlink: (_) => netlinx.constants.source_type_axlink,
        source_type_neuron_subnode_icsp: (_) =>
            netlinx.constants.source_type_neuron_subnode_icsp,
        source_type_neuron_subnode_pl: (_) =>
            netlinx.constants.source_type_neuron_subnode_pl,
        source_type_ip_socket_address: (_) =>
            netlinx.constants.source_type_ip_socket_address,
        source_type_rs232: (_) => netlinx.constants.source_type_rs232,
        source_type_internal: (_) => netlinx.constants.source_type_internal,
        source_type_mac_address: (_) =>
            netlinx.constants.source_type_mac_address,
        source_type_ipv4_port: (_) => netlinx.constants.source_type_ipv4_port,
        source_type_ipv4_port_mac_address: (_) =>
            netlinx.constants.source_type_ipv4_port_mac_address,
        source_type_ipv4_port_mac_ipv6: (_) =>
            netlinx.constants.source_type_ipv4_port_mac_ipv6,
        internal_queue_size_index_interpreter: (_) =>
            netlinx.constants.internal_queue_size_index_interpreter,
        internal_queue_size_index_notification_mgr: (_) =>
            netlinx.constants.internal_queue_size_index_notification_mgr,
        internal_queue_size_index_connection_mgr: (_) =>
            netlinx.constants.internal_queue_size_index_connection_mgr,
        internal_queue_size_index_route_mgr: (_) =>
            netlinx.constants.internal_queue_size_index_route_mgr,
        internal_queue_size_index_device_mgr: (_) =>
            netlinx.constants.internal_queue_size_index_device_mgr,
        internal_queue_size_index_diagnostic_mgr: (_) =>
            netlinx.constants.internal_queue_size_index_diagnostic_mgr,
        internal_queue_size_index_tcp_tx: (_) =>
            netlinx.constants.internal_queue_size_index_tcp_tx,
        internal_queue_size_index_ipconnection_mgr: (_) =>
            netlinx.constants.internal_queue_size_index_ipconnection_mgr,
        internal_queue_size_index_message_dispatcher: (_) =>
            netlinx.constants.internal_queue_size_index_message_dispatcher,
        internal_queue_size_index_axlink_tx: (_) =>
            netlinx.constants.internal_queue_size_index_axlink_tx,
        internal_queue_size_index_phastlink_tx: (_) =>
            netlinx.constants.internal_queue_size_index_phastlink_tx,
        internal_queue_size_index_icsplontalk_tx: (_) =>
            netlinx.constants.internal_queue_size_index_icsplontalk_tx,
        internal_queue_size_index_icsp232_tx: (_) =>
            netlinx.constants.internal_queue_size_index_icsp232_tx,
        internal_queue_size_index_icspip_tx: (_) =>
            netlinx.constants.internal_queue_size_index_icspip_tx,
        internal_queue_size_index_ni_device: (_) =>
            netlinx.constants.internal_queue_size_index_ni_device,
        true: (_) => netlinx.constants.true,
        false: (_) => netlinx.constants.false,
        file_read_only: (_) => netlinx.constants.file_read_only,
        file_rw_new: (_) => netlinx.constants.file_rw_new,
        file_rw_append: (_) => netlinx.constants.file_rw_append,
        ip_tcp: (_) => netlinx.constants.ip_tcp,
        ip_udp: (_) => netlinx.constants.ip_udp,
        ip_udp_2way: (_) => netlinx.constants.ip_udp_2way,
        xml_encode_types: (_) => netlinx.constants.xml_encode_types,
        xml_encode_char_as_list: (_) =>
            netlinx.constants.xml_encode_char_as_list,
        xml_encode_le: (_) => netlinx.constants.xml_encode_le,
        xml_decode_types: (_) => netlinx.constants.xml_decode_types,
        xml_decode_no_preserve: (_) => netlinx.constants.xml_decode_no_preserve,
        duet_dev_type_display_device: (_) =>
            netlinx.constants.duet_dev_type_display_device,
        duet_dev_type_rfidsystem_device: (_) =>
            netlinx.constants.duet_dev_type_rfidsystem_device,
        duet_dev_type_lightsystem_device: (_) =>
            netlinx.constants.duet_dev_type_lightsystem_device,
        duet_dev_type_io_device: (_) =>
            netlinx.constants.duet_dev_type_io_device,
        duet_dev_type_relay_device: (_) =>
            netlinx.constants.duet_dev_type_relay_device,
        duet_dev_type_ups: (_) => netlinx.constants.duet_dev_type_ups,
        duet_dev_type_amplifier: (_) =>
            netlinx.constants.duet_dev_type_amplifier,
        duet_dev_type_audio_conferencer: (_) =>
            netlinx.constants.duet_dev_type_audio_conferencer,
        duet_dev_type_audio_mixer: (_) =>
            netlinx.constants.duet_dev_type_audio_mixer,
        duet_dev_type_audio_processor: (_) =>
            netlinx.constants.duet_dev_type_audio_processor,
        duet_dev_type_audio_tuner_device: (_) =>
            netlinx.constants.duet_dev_type_audio_tuner_device,
        duet_dev_type_camera: (_) => netlinx.constants.duet_dev_type_camera,
        duet_dev_type_digital_media_encoder: (_) =>
            netlinx.constants.duet_dev_type_digital_media_encoder,
        duet_dev_type_digital_media_decoder: (_) =>
            netlinx.constants.duet_dev_type_digital_media_decoder,
        duet_dev_type_digital_media_server: (_) =>
            netlinx.constants.duet_dev_type_digital_media_server,
        duet_dev_type_dss: (_) => netlinx.constants.duet_dev_type_dss,
        duet_dev_type_dvr: (_) => netlinx.constants.duet_dev_type_dvr,
        duet_dev_type_disc_device: (_) =>
            netlinx.constants.duet_dev_type_disc_device,
        duet_dev_type_document_camera: (_) =>
            netlinx.constants.duet_dev_type_document_camera,
        duet_dev_type_audio_tape: (_) =>
            netlinx.constants.duet_dev_type_audio_tape,
        duet_dev_type_hvac: (_) => netlinx.constants.duet_dev_type_hvac,
        duet_dev_type_keypad: (_) => netlinx.constants.duet_dev_type_keypad,
        duet_dev_type_light: (_) => netlinx.constants.duet_dev_type_light,
        duet_dev_type_monitor: (_) => netlinx.constants.duet_dev_type_monitor,
        duet_dev_type_motor: (_) => netlinx.constants.duet_dev_type_motor,
        duet_dev_type_multi_window: (_) =>
            netlinx.constants.duet_dev_type_multi_window,
        duet_dev_type_pool_spa: (_) => netlinx.constants.duet_dev_type_pool_spa,
        duet_dev_type_preamp_surround_sound_processor: (_) =>
            netlinx.constants.duet_dev_type_preamp_surround_sound_processor,
        duet_dev_type_receiver: (_) => netlinx.constants.duet_dev_type_receiver,
        duet_dev_type_security_system: (_) =>
            netlinx.constants.duet_dev_type_security_system,
        duet_dev_type_sensor_device: (_) =>
            netlinx.constants.duet_dev_type_sensor_device,
        duet_dev_type_settop_box: (_) =>
            netlinx.constants.duet_dev_type_settop_box,
        duet_dev_type_slide_projector: (_) =>
            netlinx.constants.duet_dev_type_slide_projector,
        duet_dev_type_switcher: (_) => netlinx.constants.duet_dev_type_switcher,
        duet_dev_type_text_keypad: (_) =>
            netlinx.constants.duet_dev_type_text_keypad,
        duet_dev_type_tv: (_) => netlinx.constants.duet_dev_type_tv,
        duet_dev_type_utility: (_) => netlinx.constants.duet_dev_type_utility,
        duet_dev_type_vcr: (_) => netlinx.constants.duet_dev_type_vcr,
        duet_dev_type_video_conferencer: (_) =>
            netlinx.constants.duet_dev_type_video_conferencer,
        duet_dev_type_video_processor: (_) =>
            netlinx.constants.duet_dev_type_video_processor,
        duet_dev_type_video_projector: (_) =>
            netlinx.constants.duet_dev_type_video_projector,
        duet_dev_type_video_wall: (_) =>
            netlinx.constants.duet_dev_type_video_wall,
        duet_dev_type_volume_controller: (_) =>
            netlinx.constants.duet_dev_type_volume_controller,
        duet_dev_type_weather: (_) => netlinx.constants.duet_dev_type_weather,
        duet_dev_not_polled: (_) => netlinx.constants.duet_dev_not_polled,
        duet_dev_polled: (_) => netlinx.constants.duet_dev_polled,
        clkmgr_mode_network: (_) => netlinx.constants.clkmgr_mode_network,
        clkmgr_mode_standalone: (_) => netlinx.constants.clkmgr_mode_standalone,
        normal_standby: (_) => netlinx.constants.normal_standby,
        normal_wake: (_) => netlinx.constants.normal_wake,
        ip_multicast_ttl_option: (_) =>
            netlinx.constants.ip_multicast_ttl_option,
        ip_ttl_subnet: (_) => netlinx.constants.ip_ttl_subnet,
        ip_ttl_site: (_) => netlinx.constants.ip_ttl_site,
        ip_ttl_region: (_) => netlinx.constants.ip_ttl_region,
        ip_ttl_continent: (_) => netlinx.constants.ip_ttl_continent,
        ip_tcp_nodelay_option: (_) => netlinx.constants.ip_tcp_nodelay_option,
        ip_nodelay_on: (_) => netlinx.constants.ip_nodelay_on,
        ip_nodelay_off: (_) => netlinx.constants.ip_nodelay_off,
        amx_error: (_) => netlinx.constants.amx_error,
        amx_warning: (_) => netlinx.constants.amx_warning,
        amx_info: (_) => netlinx.constants.amx_info,
        amx_debug: (_) => netlinx.constants.amx_debug,
        netlinx_login_success: (_) => netlinx.constants.netlinx_login_success,
        netlinx_login_fail: (_) => netlinx.constants.netlinx_login_fail,
        netlinx_logout: (_) => netlinx.constants.netlinx_logout,
        null_str: (_) => netlinx.constants.null_str,
        smtp_address: (_) => netlinx.constants.smtp_address,
        smtp_port_number: (_) => netlinx.constants.smtp_port_number,
        smtp_username: (_) => netlinx.constants.smtp_username,
        smtp_password: (_) => netlinx.constants.smtp_password,
        smtp_require_tls: (_) => netlinx.constants.smtp_require_tls,
        smtp_from: (_) => netlinx.constants.smtp_from,
        smtp_tls_true: (_) => netlinx.constants.smtp_tls_true,
        smtp_tls_false: (_) => netlinx.constants.smtp_tls_false,
        listview_on_row_select_event: (_) =>
            netlinx.constants.listview_on_row_select_event,
        data_structure_unknown: (_) => netlinx.constants.data_structure_unknown,
        data_structure_datafeed: (_) =>
            netlinx.constants.data_structure_datafeed,
        data_structure_datarecordset: (_) =>
            netlinx.constants.data_structure_datarecordset,
        data_structure_datarecord: (_) =>
            netlinx.constants.data_structure_datarecord,
        data_structure_datafield: (_) =>
            netlinx.constants.data_structure_datafield,
        data_max_content_field_count: (_) =>
            netlinx.constants.data_max_content_field_count,
        data_max_metadata_field_count: (_) =>
            netlinx.constants.data_max_metadata_field_count,
        data_max_id_length: (_) => netlinx.constants.data_max_id_length,
        data_max_name_length: (_) => netlinx.constants.data_max_name_length,
        data_max_description_length: (_) =>
            netlinx.constants.data_max_description_length,
        data_max_type_length: (_) => netlinx.constants.data_max_type_length,
        data_max_format_length: (_) => netlinx.constants.data_max_format_length,
        data_max_source_length: (_) => netlinx.constants.data_max_source_length,
        data_max_value_length: (_) => netlinx.constants.data_max_value_length,
        data_max_label_length: (_) => netlinx.constants.data_max_label_length,
        data_max_url_length: (_) => netlinx.constants.data_max_url_length,
        max_last_login_info_length: (_) =>
            netlinx.constants.max_last_login_info_length,
        data_type_unknown: (_) => netlinx.constants.data_type_unknown,
        data_type_string: (_) => netlinx.constants.data_type_string,
        data_type_datetime: (_) => netlinx.constants.data_type_datetime,
        data_type_date: (_) => netlinx.constants.data_type_date,
        data_type_time: (_) => netlinx.constants.data_type_time,
        data_type_image: (_) => netlinx.constants.data_type_image,
        data_format_url: (_) => netlinx.constants.data_format_url,
        data_format_phone: (_) => netlinx.constants.data_format_phone,
        data_format_email: (_) => netlinx.constants.data_format_email,
        data_format_iso8601: (_) => netlinx.constants.data_format_iso8601,
        auditlog_priv: (_) => netlinx.constants.auditlog_priv,
        configuration_priv: (_) => netlinx.constants.configuration_priv,
        deviceconfig_priv: (_) => netlinx.constants.deviceconfig_priv,
        ftp_priv: (_) => netlinx.constants.ftp_priv,
        http_priv: (_) => netlinx.constants.http_priv,
        networkconfig_priv: (_) => netlinx.constants.networkconfig_priv,
        programport_priv: (_) => netlinx.constants.programport_priv,
        remoteui_priv: (_) => netlinx.constants.remoteui_priv,
        securitycontrol_priv: (_) => netlinx.constants.securitycontrol_priv,
        softwaremanagement_priv: (_) =>
            netlinx.constants.softwaremanagement_priv,
        terminal_priv: (_) => netlinx.constants.terminal_priv,
        tpadmin_priv: (_) => netlinx.constants.tpadmin_priv,
        user1_priv: (_) => netlinx.constants.user1_priv,
        user2_priv: (_) => netlinx.constants.user2_priv,
        user3_priv: (_) => netlinx.constants.user3_priv,
        user4_priv: (_) => netlinx.constants.user4_priv,
        usermanagement_priv: (_) => netlinx.constants.usermanagement_priv,
        valid_account: (_) => netlinx.constants.valid_account,
        err_name_invalid: (_) => netlinx.constants.err_name_invalid,
        err_password_invalid: (_) => netlinx.constants.err_password_invalid,
        err_invalid_account: (_) => netlinx.constants.err_invalid_account,
        err_no_authorization: (_) => netlinx.constants.err_no_authorization,
        err_invalid_parameter: (_) => netlinx.constants.err_invalid_parameter,
        err_user_locked_out: (_) => netlinx.constants.err_user_locked_out,
        err_user_account_expired: (_) =>
            netlinx.constants.err_user_account_expired,
        err_general_error: (_) => netlinx.constants.err_general_error,
        err_authentication_error: (_) =>
            netlinx.constants.err_authentication_error,
        tls_ignore_certificate_errors: (_) =>
            netlinx.constants.tls_ignore_certificate_errors,
        tls_validate_certificate: (_) =>
            netlinx.constants.tls_validate_certificate,
    },

    types: {
        tdata: (_) => netlinx.types.tdata,
        tchannel: (_) => netlinx.types.tchannel,
        tlevel: (_) => netlinx.types.tlevel,
        tbutton: (_) => netlinx.types.tbutton,
        ttimeline: (_) => netlinx.types.ttimeline,
        tcustom: (_) => netlinx.types.tcustom,
        url_struct: (_) => netlinx.types.url_struct,
        dns_struct: (_) => netlinx.types.dns_struct,
        ip_address_struct: (_) => netlinx.types.ip_address_struct,
        dev_info_struct: (_) => netlinx.types.dev_info_struct,
        clkmgr_timeserver_struct: (_) => netlinx.types.clkmgr_timeserver_struct,
        data_feed: (_) => netlinx.types.data_feed,
        data_field: (_) => netlinx.types.data_field,
        data_record: (_) => netlinx.types.data_record,
        wc_data_feed: (_) => netlinx.types.wc_data_feed,
        wc_data_field: (_) => netlinx.types.wc_data_field,
        wc_data_record: (_) => netlinx.types.wc_data_record,
        last_login_info: (_) => netlinx.types.last_login_info,
    },

    variables: {
        ___reserved___: (_) => netlinx.variables.___reserved___,
        date: (_) => netlinx.variables.date,
        day: (_) => netlinx.variables.day,
        time: (_) => netlinx.variables.time,
        ldate: (_) => netlinx.variables.ldate,
        push_device: (_) => netlinx.variables.push_device,
        push_channel: (_) => netlinx.variables.push_channel,
        push_devchan: (_) => netlinx.variables.push_devchan,
        release_device: (_) => netlinx.variables.release_device,
        release_channel: (_) => netlinx.variables.release_channel,
        release_devchan: (_) => netlinx.variables.release_devchan,
        master_slot: (_) => netlinx.variables.master_slot,
        get_pulse_time: (_) => netlinx.variables.get_pulse_time,
        get_timer: (_) => netlinx.variables.get_timer,
        master_sn: (_) => netlinx.variables.master_sn,
        system_number: (_) => netlinx.variables.system_number,
        button: (_) => netlinx.variables.button,
        dv_channel: (_) => netlinx.variables.dv_channel,
        data: (_) => netlinx.variables.data,
        level: (_) => netlinx.variables.level,
        timeline: (_) => netlinx.variables.timeline,
        channel: (_) => netlinx.variables.channel,
        custom: (_) => netlinx.variables.custom,
    },

    functions: {
        // Core string functions
        atoi: (_) => netlinx.functions.atoi,
        atol: (_) => netlinx.functions.atol,
        atof: (_) => netlinx.functions.atof,
        itoa: (_) => netlinx.functions.itoa,
        itohex: (_) => netlinx.functions.itohex,
        hextoi: (_) => netlinx.functions.hextoi,
        ftoa: (_) => netlinx.functions.ftoa,

        // String manipulation
        find_string: (_) => netlinx.functions.find_string,
        left_string: (_) => netlinx.functions.left_string,
        right_string: (_) => netlinx.functions.right_string,
        mid_string: (_) => netlinx.functions.mid_string,
        remove_string: (_) => netlinx.functions.remove_string,
        get_buffer_string: (_) => netlinx.functions.get_buffer_string,
        get_buffer_char: (_) => netlinx.functions.get_buffer_char,
        get_multi_buffer_string: (_) =>
            netlinx.functions.get_multi_buffer_string,
        length_string: (_) => netlinx.functions.length_string,
        max_length_string: (_) => netlinx.functions.max_length_string,
        set_length_string: (_) => netlinx.functions.set_length_string,
        compare_string: (_) => netlinx.functions.compare_string,
        upper_string: (_) => netlinx.functions.upper_string,
        lower_string: (_) => netlinx.functions.lower_string,
        get_last: (_) => netlinx.functions.get_last,

        // Time and date functions
        date_to_day: (_) => netlinx.functions.date_to_day,
        date_to_month: (_) => netlinx.functions.date_to_month,
        date_to_year: (_) => netlinx.functions.date_to_year,
        time_to_hour: (_) => netlinx.functions.time_to_hour,
        time_to_minute: (_) => netlinx.functions.time_to_minute,
        time_to_second: (_) => netlinx.functions.time_to_second,
        day_of_week: (_) => netlinx.functions.day_of_week,
        set_pulse_time: (_) => netlinx.functions.set_pulse_time,
        set_timer: (_) => netlinx.functions.set_timer,

        // File I/O functions
        file_open: (_) => netlinx.functions.file_open,
        file_close: (_) => netlinx.functions.file_close,
        file_read: (_) => netlinx.functions.file_read,
        file_read_line: (_) => netlinx.functions.file_read_line,
        file_write: (_) => netlinx.functions.file_write,
        file_write_line: (_) => netlinx.functions.file_write_line,
        file_copy: (_) => netlinx.functions.file_copy,
        file_delete: (_) => netlinx.functions.file_delete,
        file_rename: (_) => netlinx.functions.file_rename,
        file_dir: (_) => netlinx.functions.file_dir,
        file_getdir: (_) => netlinx.functions.file_getdir,
        file_setdir: (_) => netlinx.functions.file_setdir,
        file_create_dir: (_) => netlinx.functions.file_create_dir,
        file_remove_dir: (_) => netlinx.functions.file_remove_dir,
        file_seek: (_) => netlinx.functions.file_seek,

        // Array functions
        length_array: (_) => netlinx.functions.length_array,
        max_length_array: (_) => netlinx.functions.max_length_array,
        set_length_array: (_) => netlinx.functions.set_length_array,

        // Network functions
        ip_client_open: (_) => netlinx.functions.ip_client_open,
        ip_client_close: (_) => netlinx.functions.ip_client_close,
        ip_server_open: (_) => netlinx.functions.ip_server_open,
        ip_server_close: (_) => netlinx.functions.ip_server_close,
        ip_bound_client_open: (_) => netlinx.functions.ip_bound_client_open,
        ip_mc_server_open: (_) => netlinx.functions.ip_mc_server_open,
        ip_set_option: (_) => netlinx.functions.ip_set_option,

        // Secure network functions
        ssh_client_open: (_) => netlinx.functions.ssh_client_open,
        ssh_client_close: (_) => netlinx.functions.ssh_client_close,
        tls_client_open: (_) => netlinx.functions.tls_client_open,
        tls_client_close: (_) => netlinx.functions.tls_client_close,

        // Device functions
        do_push: (_) => netlinx.functions.do_push,
        do_push_timed: (_) => netlinx.functions.do_push_timed,
        do_release: (_) => netlinx.functions.do_release,
        device_id: (_) => netlinx.functions.device_id,
        device_info: (_) => netlinx.functions.device_info,
        device_id_string: (_) => netlinx.functions.device_id_string,
        device_standby: (_) => netlinx.functions.device_standby,
        device_wake: (_) => netlinx.functions.device_wake,

        // Timeline functions
        timeline_create: (_) => netlinx.functions.timeline_create,
        timeline_kill: (_) => netlinx.functions.timeline_kill,
        timeline_reload: (_) => netlinx.functions.timeline_reload,
        timeline_pause: (_) => netlinx.functions.timeline_pause,
        timeline_restart: (_) => netlinx.functions.timeline_restart,
        timeline_set: (_) => netlinx.functions.timeline_set,
        timeline_get: (_) => netlinx.functions.timeline_get,
        timeline_active: (_) => netlinx.functions.timeline_active,
        timeline_dynamic_id: (_) => netlinx.functions.timeline_dynamic_id,

        // Variable conversion
        variable_to_string: (_) => netlinx.functions.variable_to_string,
        string_to_variable: (_) => netlinx.functions.string_to_variable,
        length_variable_to_string: (_) =>
            netlinx.functions.length_variable_to_string,
        type_cast: (_) => netlinx.functions.type_cast,

        // XML functions
        variable_to_xml: (_) => netlinx.functions.variable_to_xml,
        xml_to_variable: (_) => netlinx.functions.xml_to_variable,
        length_variable_to_xml: (_) => netlinx.functions.length_variable_to_xml,

        // System functions
        redirect_string: (_) => netlinx.functions.redirect_string,
        random_number: (_) => netlinx.functions.random_number,
        get_unique_id: (_) => netlinx.functions.get_unique_id,
        get_system_number: (_) => netlinx.functions.get_system_number,
        set_system_number: (_) => netlinx.functions.set_system_number,
        get_serial_number: (_) => netlinx.functions.get_serial_number,
        get_master_build: (_) => netlinx.functions.get_master_build,
        set_validation_code: (_) => netlinx.functions.set_validation_code,
        reboot: (_) => netlinx.functions.reboot,

        // Duet module functions
        load_duet_module: (_) => netlinx.functions.load_duet_module,
        unload_duet_module: (_) => netlinx.functions.unload_duet_module,
        duet_mem_size_set: (_) => netlinx.functions.duet_mem_size_set,
        duet_mem_size_get: (_) => netlinx.functions.duet_mem_size_get,

        // Dynamic device functions
        dynamic_application_device: (_) =>
            netlinx.functions.dynamic_application_device,
        dynamic_polled_port: (_) => netlinx.functions.dynamic_polled_port,
        static_port_binding: (_) => netlinx.functions.static_port_binding,
        static_ip_binding: (_) => netlinx.functions.static_ip_binding,

        // DNS and IP functions
        get_dns_list: (_) => netlinx.functions.get_dns_list,
        set_dns_list: (_) => netlinx.functions.set_dns_list,
        get_ip_address: (_) => netlinx.functions.get_ip_address,
        set_ip_address: (_) => netlinx.functions.set_ip_address,
        get_url_list: (_) => netlinx.functions.get_url_list,
        add_url_entry: (_) => netlinx.functions.add_url_entry,
        delete_url_entry: (_) => netlinx.functions.delete_url_entry,

        // Math functions
        abs_value: (_) => netlinx.functions.abs_value,
        max_value: (_) => netlinx.functions.max_value,
        min_value: (_) => netlinx.functions.min_value,
        exp_value: (_) => netlinx.functions.exp_value,
        log_value: (_) => netlinx.functions.log_value,
        log10_value: (_) => netlinx.functions.log10_value,
        power_value: (_) => netlinx.functions.power_value,
        sqrt_value: (_) => netlinx.functions.sqrt_value,

        // Raw data functions
        raw_be: (_) => netlinx.functions.raw_be,
        raw_le: (_) => netlinx.functions.raw_le,

        // Queue functions
        internal_queue_size_set: (_) =>
            netlinx.functions.internal_queue_size_set,
        internal_queue_size_get: (_) =>
            netlinx.functions.internal_queue_size_get,
        internal_threshold_set: (_) => netlinx.functions.internal_threshold_set,
        internal_threshold_get: (_) => netlinx.functions.internal_threshold_get,

        // Event functions
        rebuilt_event: (_) => netlinx.functions.rebuilt_event,
        do_custom_event: (_) => netlinx.functions.do_custom_event,

        // Clock manager functions
        clkmgr_is_network_sourced: (_) =>
            netlinx.functions.clkmgr_is_network_sourced,
        clkmgr_set_clk_source: (_) => netlinx.functions.clkmgr_set_clk_source,
        clkmgr_is_daylightsavings_on: (_) =>
            netlinx.functions.clkmgr_is_daylightsavings_on,
        clkmgr_set_daylightsavings_mode: (_) =>
            netlinx.functions.clkmgr_set_daylightsavings_mode,
        clkmgr_get_timezone: (_) => netlinx.functions.clkmgr_get_timezone,
        clkmgr_set_timezone: (_) => netlinx.functions.clkmgr_set_timezone,
        clkmgr_get_resync_period: (_) =>
            netlinx.functions.clkmgr_get_resync_period,
        clkmgr_set_resync_period: (_) =>
            netlinx.functions.clkmgr_set_resync_period,
        clkmgr_get_daylightsavings_offset: (_) =>
            netlinx.functions.clkmgr_get_daylightsavings_offset,
        clkmgr_set_daylightsavings_offset: (_) =>
            netlinx.functions.clkmgr_set_daylightsavings_offset,
        clkmgr_get_active_timeserver: (_) =>
            netlinx.functions.clkmgr_get_active_timeserver,
        clkmgr_set_active_timeserver: (_) =>
            netlinx.functions.clkmgr_set_active_timeserver,
        clkmgr_get_timeservers: (_) => netlinx.functions.clkmgr_get_timeservers,
        clkmgr_add_userdefined_timeserver: (_) =>
            netlinx.functions.clkmgr_add_userdefined_timeserver,
        clkmgr_delete_userdefined_timeserver: (_) =>
            netlinx.functions.clkmgr_delete_userdefined_timeserver,
        clkmgr_get_start_daylightsavings_rule: (_) =>
            netlinx.functions.clkmgr_get_start_daylightsavings_rule,
        clkmgr_set_start_daylightsavings_rule: (_) =>
            netlinx.functions.clkmgr_set_start_daylightsavings_rule,
        clkmgr_get_end_daylightsavings_rule: (_) =>
            netlinx.functions.clkmgr_get_end_daylightsavings_rule,
        clkmgr_set_end_daylightsavings_rule: (_) =>
            netlinx.functions.clkmgr_set_end_daylightsavings_rule,

        // Logging functions
        set_log_level: (_) => netlinx.functions.set_log_level,
        get_log_level: (_) => netlinx.functions.get_log_level,
        amx_log: (_) => netlinx.functions.amx_log,

        // Email functions
        smtp_server_config_set: (_) => netlinx.functions.smtp_server_config_set,
        smtp_server_config_get: (_) => netlinx.functions.smtp_server_config_get,
        smtp_send: (_) => netlinx.functions.smtp_send,

        // Account functions
        validate_netlinx_account: (_) =>
            netlinx.functions.validate_netlinx_account,
        validate_netlinx_account_with_permission: (_) =>
            netlinx.functions.validate_netlinx_account_with_permission,
        authenticate_certificate: (_) =>
            netlinx.functions.authenticate_certificate,

        // Audit functions
        audit_netlinx_session_event: (_) =>
            netlinx.functions.audit_netlinx_session_event,
        audit_netlinx_generic_event: (_) =>
            netlinx.functions.audit_netlinx_generic_event,

        // Disk functions
        get_available_flash_disk_space: (_) =>
            netlinx.functions.get_available_flash_disk_space,
        get_max_flash_disk_space: (_) =>
            netlinx.functions.get_max_flash_disk_space,

        // Data feed functions
        data_create_feed: (_) => netlinx.functions.data_create_feed,
        data_delete_feed: (_) => netlinx.functions.data_delete_feed,
        data_publish_feed: (_) => netlinx.functions.data_publish_feed,
        data_get_published_feed: (_) =>
            netlinx.functions.data_get_published_feed,
        data_add_record: (_) => netlinx.functions.data_add_record,
        data_get_event_record: (_) => netlinx.functions.data_get_event_record,

        // WC data feed functions
        _wc_data_create_feed: (_) => netlinx.functions._wc_data_create_feed,
        _wc_data_add_record: (_) => netlinx.functions._wc_data_add_record,
        _wc_data_get_event_record: (_) =>
            netlinx.functions._wc_data_get_event_record,

        // Other specialized functions
        format: (_) => netlinx.functions.format,
        astro_clock: (_) => netlinx.functions.astro_clock,
        set_outdoor_temperature: (_) =>
            netlinx.functions.set_outdoor_temperature,
        set_virtual_level_count: (_) =>
            netlinx.functions.set_virtual_level_count,
        set_virtual_channel_count: (_) =>
            netlinx.functions.set_virtual_channel_count,
        set_virtual_port_count: (_) => netlinx.functions.set_virtual_port_count,

        // Unimplemented functions
        _wc_encode_int: (_) => netlinx.functions._wc_encode_int,
        _wc_decode_int: (_) => netlinx.functions._wc_decode_int,
        _wc_int: (_) => netlinx.functions._wc_int,
        _wc_to_ch_int: (_) => netlinx.functions._wc_to_ch_int,
        _ch_to_wc_int: (_) => netlinx.functions._ch_to_wc_int,
        _wc_find_string_int: (_) => netlinx.functions._wc_find_string_int,
        _wc_left_string_int: (_) => netlinx.functions._wc_left_string_int,
        _wc_lower_string_int: (_) => netlinx.functions._wc_lower_string_int,
        _wc_mid_string_int: (_) => netlinx.functions._wc_mid_string_int,
        _wc_remove_string_int: (_) => netlinx.functions._wc_remove_string_int,
        _wc_right_string_int: (_) => netlinx.functions._wc_right_string_int,
        _wc_upper_string_int: (_) => netlinx.functions._wc_upper_string_int,
        _wc_compare_string_int: (_) => netlinx.functions._wc_compare_string_int,
        _wc_get_buffer_char_int: (_) =>
            netlinx.functions._wc_get_buffer_char_int,
        _wc_get_buffer_string_int: (_) =>
            netlinx.functions._wc_get_buffer_string_int,
        _wc_concat_string_int: (_) => netlinx.functions._wc_concat_string_int,
        _wc_file_open_int: (_) => netlinx.functions._wc_file_open_int,
        _wc_file_close_int: (_) => netlinx.functions._wc_file_close_int,
        _wc_file_read_int: (_) => netlinx.functions._wc_file_read_int,
        _wc_file_read_line_int: (_) => netlinx.functions._wc_file_read_line_int,
        _wc_file_write_int: (_) => netlinx.functions._wc_file_write_int,
        _wc_file_write_line_int: (_) =>
            netlinx.functions._wc_file_write_line_int,
    },
};
